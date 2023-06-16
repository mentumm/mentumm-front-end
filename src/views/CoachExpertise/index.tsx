import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Container,
  Grid,
  Heading
} from "@chakra-ui/react";
import { menApiAuthClient } from '../../clients/mentumm';
import envConfig from '../../envConfig';
import { Tag } from '../../types';
import { CurrentUser } from '../../types';
import { useNavigate } from 'react-router';

type TagsSectionProps = {
  tags: {
    category: string,
    data: Tag[];
  };
};

const TagsSection: React.FC<TagsSectionProps> = ({
  tags
}) => (
  <Box my={8}>
    <Heading size="md" mb={4}>
      {tags.category}
    </Heading>
    <Grid
      pl={8}
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      {tags.data.map((tag: Tag) => (
        <Card
          h="40px"
          w="279px"
          pl={2}
          pt={2}
        >
          {tag.name}
        </Card>
      ))}
    </Grid>
  </Box>
)

type CoachExpertiseProps = {
  currentUser: CurrentUser;
};

export const CoachExpertise: React.FC<CoachExpertiseProps> = ({
  currentUser
}) => {
  const navigate = useNavigate();
  const [professionalTags, setProfessionalTags] = useState({ category: "Professional", data: [] });
  const [leadershipTags, setLeadershipTags] = useState({ category: "Leadership", data: [] });
  const [personalTags, setPersonalTags] = useState({ category: "Personal", data: [] });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  type Setter = React.Dispatch<React.SetStateAction<{ category: string, data: Tag[] }>>;

  const setTags = (
    setter: Setter,
    data: Tag[],
    category: string
  ) => {
    setter(prevState => ({
      ...prevState,
      data: data.filter(tag => tag.category === category)
    }));
  };

  console.log(professionalTags)

  useEffect(() => {
    const getTags = async () => {
      try {
        setLoading(true);

        const { data } = await menApiAuthClient().get<Tag[]>(
          `${envConfig.API_URL}/v1/tags?kind=expertise`
        );
        setTags(setProfessionalTags, data, "Professional");
        setTags(setLeadershipTags, data, "Leadership");
        setTags(setPersonalTags, data, "Personal");

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
        user_id: currentUser.id,
        clear: true,
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
      <Heading size="lg" textAlign="left" my={8}>
        Pick up to 6 Areas of Expertise
      </Heading>
      <Box>
        <TagsSection tags={professionalTags} />
        <TagsSection tags={leadershipTags} />
        <TagsSection tags={personalTags} />
      </Box>
    </Container>
  )
}