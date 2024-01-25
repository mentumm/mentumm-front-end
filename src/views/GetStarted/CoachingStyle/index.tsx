import React, { useEffect, useState } from "react";
import { menApiAuthClient } from "../../../clients/mentumm";
import { CoachType, Tag } from "../../../types";
import {
  Button,
  Flex,
  Heading,
  Image,
  Box,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import envConfig from "../../../envConfig";
import { useNavigate } from "react-router";
import { CurrentUser } from "../../../types";
import { useCookies } from "react-cookie";
import { SvgLayer } from "../../../components/Waves/svgLayer";
import logo from "../../../assets/minimal-mentumm-logo.svg";
import { ContentContainer } from "./components/ContentContainer";


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
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [, setCookie] = useCookies(["growth_10_03142023"]);
  const [hasExpertiseTags, setHasExpertiseTags] = useState<Boolean>(false);

  const bgImage = 'https://mentummportal.sfo3.digitaloceanspaces.com/mentumm-splash.jpeg';

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
        tag_ids: selectedItems,
        kind: "style",
        user_id: currentUser.id,
        clear: true,
      })
      .then(() => {
        window.scrollTo(0, 0);
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
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      bgImage={`url(${bgImage})`}
      bgPos="center center"
      bgSize="cover"
    >
      <VStack
        position="absolute"
        top="0"
        pt={8}
        textAlign="center"
      >
        <Image src={logo} boxSize="150px" />
        <Heading zIndex={1} size="2xl" fontWeight="400" color="white">
          {isCoach
            ? "Select Your Coaching Styles"
            : "Select Your Desired Coaching Style"}
        </Heading>
        <Heading zIndex={1} size="md" textAlign="left" mt={8} color="white">
          {isCoach
            ? "Pick 2 coaching styles that describe you best"
            : "Pick 2 coaching styles most conducive to your growth goals."}
        </Heading>
      </VStack>
      <Box>
        <SvgLayer
          vbHeight="825"
        >
          <path
            d="M1440 55.0362V492H0V0C160.575 75.0766 406.2 180.288 710.55 182.008C1024.35 183.878 1277.1 131.234 1440 55.0362Z"
            fill="#2CBBBC"
          />
        </SvgLayer>
        <SvgLayer
          vbHeight="825"
        >
          <path
            d="M0 55.0362V825H1440V0C1279.43 75.0766 1033.8 180.288 729.45 182.008C415.65 183.878 162.9 131.234 0 55.0362Z"
            fill="#0D1C31"
          />
        </SvgLayer>
        <SvgLayer
          vbHeight="230"
        >
          <path
            d="M1440 55.0362V252H0V0C160.575 75.0766 406.2 180.288 710.55 182.008C1024.35 183.878 1277.1 131.234 1440 55.0362Z" fill="#2CBBBC" />
        </SvgLayer>
        <SvgLayer
          vbHeight="230"
        >
          <path
            d="M0 55.0362V550H1440V0C1279.43 75.0766 1033.8 180.288 729.45 182.008C415.65 183.878 162.9 131.234 0 55.0362Z" fill="#0D1C31" />
        </SvgLayer>
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        <ContentContainer
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          tags={tags}
        />
      )}
      <Box mt="2em">
        <Button
          mt={8}
          padding={7}
          fontWeight="bold"
          isDisabled={selectedItems.length < 2 || saving}
          onClick={handleContinue}
        >
          CONTINUE {saving && <Spinner ml={1} size="xs" />}
        </Button>
      </Box>
    </Flex>
  );
};

export default CoachingStyle;
