import React, { useEffect, useState } from "react";
import { menApiAuthClient } from "../../../clients/mentumm";
import { StyleType } from "../../../types";
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
import { StyleTypeIcon } from "../../../components/StyleTypeIcon";
import envConfig from "../../../envConfig";
import { useNavigate } from "react-router";
import { CurrentUser } from "../../../types";

type StyleTypeOptionProps = {
  styleType: StyleType;
  checkedItems: Number[];
  setCheckedItems: Function;
};

const StyleTypeOption: React.FC<StyleTypeOptionProps> = ({
  styleType,
  checkedItems,
  setCheckedItems,
}) => {
  const toggleStyleTypeChecked = (id: number) => {
    if (checkedItems.includes(id)) {
      return checkedItems.filter((item) => item !== id);
    }

    return [...checkedItems, id];
  };

  return (
    <Checkbox
      value={styleType.id}
      isChecked={checkedItems.includes(Number(styleType.id))}
      onChange={(e) =>
        setCheckedItems(toggleStyleTypeChecked(Number(e.target.value)))
      }
      isDisabled={
        !checkedItems.includes(Number(styleType.id)) && checkedItems.length > 1
      }
      aria-label={styleType.name}
      display={"flex"}
    >
      <Flex
        alignItems="center"
        p={2}
        align="stretch"
        width={330}
        backgroundColor={
          checkedItems.includes(Number(styleType.id)) ? "#C0E1FF" : "#EDF2F7"
        }
        borderRadius={4}
        _hover={{ bg: checkedItems.length < 2 ? "#C0E1FF" : "" }}
      >
        <StyleTypeIcon icon={styleType.icon} />
        <Text textTransform="uppercase" fontWeight="bold" mr={1}>
          {styleType.name}
        </Text>{" "}
        <Text>- {styleType.description}</Text>
      </Flex>
    </Checkbox>
  );
};

type ContentContainerProps = {
  styleTypes: StyleType[];
  checkedItems: Number[];
  setCheckedItems: Function;
};

const ContentContainer: React.FC<ContentContainerProps> = ({
  styleTypes,
  checkedItems,
  setCheckedItems,
}) => {
  return (
    <Stack direction="column" spacing={3} align="stretch">
      {styleTypes.map((styleType) => (
        <StyleTypeOption
          key={styleType.id}
          styleType={styleType}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      ))}
    </Stack>
  );
};

type CoachingStyleProps = {
  currentUser: CurrentUser;
};

const CoachingStyle: React.FC<CoachingStyleProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const [styleTypes, setStyleTypes] = useState<StyleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([]);

  useEffect(() => {
    const getStyleTypes = async () => {
      try {
        setLoading(true);

        const results = await menApiAuthClient().get<StyleType[]>(
          `${envConfig.API_URL}/v1/style_types`
        );

        setStyleTypes(results.data.sort(() => (Math.random() > 0.5 ? 1 : -1)));
      } catch (error) {
        throw new Error("Could not load Style Types!");
      } finally {
        setLoading(false);
      }
    };
    getStyleTypes();
  }, []);

  const handleContinue = async () => {
    if (saving) {
      return;
    }

    setSaving(true);

    await menApiAuthClient()
      .post(`${envConfig.API_URL}/v1/user/${currentUser.id}/style_types`, {
        style_types: checkedItems,
      })
      .then(() => {
        navigate("/search");
      })
      .finally(() => {
        setSaving(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Container maxW={1270}>
      <Heading size="lg" textAlign="left" mt={8}>
        Select Your Desired Coaching Style
      </Heading>

      <Heading size="md" textAlign="left" mt={8}>
        Pick 2 coaching styles most conducive to your growth goals.
      </Heading>

      <Text mt={4} mb={6}>
        You can update this later in your profile.
      </Text>

      {loading ? (
        <Spinner />
      ) : (
        <ContentContainer
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          styleTypes={styleTypes}
        />
      )}

      <Button
        background="#2cbdbe"
        color="#fff"
        _hover={{ bg: "#3CA8AB" }}
        mt={8}
        padding={7}
        fontWeight="bold"
        isDisabled={checkedItems.length < 2 || saving}
        onClick={handleContinue}
      >
        CONTINUE {saving && <Spinner ml={1} size="xs" />}
      </Button>
    </Container>
  );
};

export default CoachingStyle;
