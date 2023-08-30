import React, { useEffect, useState } from "react";
import { menApiAuthClient } from "../../../clients/mentumm";
import { CoachType, Tag } from "../../../types";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { TagIcon } from "../../../components/TagIcon";
import envConfig from "../../../envConfig";
import { useNavigate } from "react-router";
import { CurrentUser } from "../../../types";
import { useCookies } from "react-cookie";
import PageWrapper from "../../../components/Wrappers/PageWrapper";

type TagOptionProps = {
  tag: Tag;
  checkedItems: Number[];
  setCheckedItems: Function;
};

const TagOption: React.FC<TagOptionProps> = ({
  tag,
  checkedItems,
  setCheckedItems,
}) => {
  const toggleTagChecked = (id: number) => {
    if (checkedItems.includes(id)) {
      return checkedItems.filter((item) => item !== id);
    }

    return [...checkedItems, id];
  };

  return (
    <Checkbox
      colorScheme="brand"
      value={tag.id}
      isChecked={checkedItems.includes(Number(tag.id))}
      onChange={(e) =>
        setCheckedItems(toggleTagChecked(Number(e.target.value)))
      }
      isDisabled={
        !checkedItems.includes(Number(tag.id)) && checkedItems.length > 1
      }
      aria-label={tag.name}
      display={"flex"}
    >
      <Flex
        alignItems="center"
        p={2}
        align="stretch"
        width={330}
        backgroundColor={
          checkedItems.includes(Number(tag.id)) ? "#C0E1FF" : "#EDF2F7"
        }
        borderRadius={4}
        _hover={{ bg: checkedItems.length < 2 ? "#C0E1FF" : "" }}
      >
        <TagIcon icon={tag.icon} />
        <Text textTransform="uppercase" fontWeight="bold" mr={1}>
          {tag.name}
        </Text>{" "}
        <Text>- {tag.description}</Text>
      </Flex>
    </Checkbox>
  );
};

type ContentContainerProps = {
  tags: Tag[];
  checkedItems: Number[];
  setCheckedItems: Function;
};

const ContentContainer: React.FC<ContentContainerProps> = ({
  tags,
  checkedItems,
  setCheckedItems,
}) => {
  return (
    <Stack direction="column" spacing={3} align="stretch">
      {tags.map((tag) => (
        <TagOption
          key={tag.id}
          tag={tag}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      ))}
    </Stack>
  );
};

type CoachingStyleProps = {
  isCoach?: boolean;
  currentUser: CurrentUser;
  setCurrentUser: Function;
};

const CoachingStyle: React.FC<CoachingStyleProps> = ({
  currentUser,
  setCurrentUser,
  isCoach,
}) => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([]);
  const [, setCookie] = useCookies(["growth_10_03142023"]);
  const [hasExpertiseTags, setHasExpertiseTags] = useState<Boolean>(false);

  useEffect(() => {
    const getTags = async () => {
      try {
        setLoading(true);

        const styleResults = await menApiAuthClient().get<Tag[]>(
          `${envConfig.API_URL}/v1/tags?kind=style`
        );
        const singleCoach = await menApiAuthClient().get<CoachType>("/coaches", {
          params: {
            id: currentUser?.id,
          },
        });
        const coachExpertise = singleCoach.data.expertise;
        setHasExpertiseTags(!!coachExpertise);
        setTags(styleResults.data.sort(() => (Math.random() > 0.5 ? 1 : -1)));
      } catch (error) {
        throw new Error("Could not load Style Tags!");
      } finally {
        setLoading(false);
      }
    };
    getTags();
  }, []);



  const handleContinue = async () => {
    if (saving) {
      return;
    }

    setSaving(true);

    await menApiAuthClient()
      .post(`${envConfig.API_URL}/v1/user/tags`, {
        tag_ids: checkedItems,
        kind: "style",
        user_id: currentUser.id,
        clear: true,
      })
      .then(() => {
        isCoach
          ? navigate(`/coach/${currentUser.id}/${hasExpertiseTags ? 'profile' : 'expertise'}`)
          : navigate("/search");
      })
      .finally(() => {
        setSaving(false);
      })
      .catch((e) => {
        console.error(e);
      });

    if (currentUser.role === "coach" && !currentUser.last_sign_in) {
      setCurrentUser({ ...currentUser, last_sign_in: new Date() });
      setCookie(
        "growth_10_03142023",
        { ...currentUser, last_sign_in: new Date() },
        {
          path: "/",
          secure: true,
          expires: new Date(Date.now() + 3600 * 1000 * 48),
          sameSite: true,
        }
      );
    }
  };

  return (
    <PageWrapper>
      <Container maxW={1270} pt={0} >
        <Heading size="lg" textAlign="left" mt={8}>
          {isCoach
            ? "Select Your Coaching Styles"
            : "Select Your Desired Coaching Style"}
        </Heading>

        <Heading size="md" textAlign="left" mt={8}>
          {isCoach
            ? "Pick 2 coaching styles that describe you best"
            : "Pick 2 coaching styles most conducive to your growth goals."}
        </Heading>

        {isCoach && (
          <Heading size="sm">
            These are used in guiding mentee-coach matches.
          </Heading>
        )}

        <Text mt={4} mb={6}>
          You can update this later in your profile.
        </Text>

        {loading ? (
          <Spinner />
        ) : (
          <ContentContainer
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            tags={tags}
          />
        )}

        <Button
          mt={8}
          padding={7}
          fontWeight="bold"
          isDisabled={checkedItems.length < 2 || saving}
          onClick={handleContinue}
        >
          CONTINUE {saving && <Spinner ml={1} size="xs" />}
        </Button>
      </Container>
    </PageWrapper>
  );
};

export default CoachingStyle;
