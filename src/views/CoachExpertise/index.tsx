import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Container,
  Heading
} from "@chakra-ui/react";
import { menApiAuthClient } from '../../clients/mentumm';
import envConfig from '../../envConfig';
import { Tag } from '../../types';
import { CurrentUser } from '../../types';
import { useNavigate } from 'react-router';

type CoachExpertiseProps = {
  currentUser: CurrentUser;
};
export const CoachExpertise: React.FC<CoachExpertiseProps> = ({
  currentUser
}) => {
  const navigate = useNavigate();
  const [professionalTags, setProfessionalTags] = useState([]);
  const [leadershipTags, setLeadershipTags] = useState([]);
  const [personalTags, setPersonalTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const tagCategories = ["Professional", "Leadership", "Personal"];

  const setTags = (
    setter: Function,
    data: Tag[],
    kind: string) => (
    setter(data.filter((tag) => tag.category === kind))
  );

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
        <Box>
          <Heading size="md" mb={4}>
            Professional
          </Heading>
          <Box>
            {professionalTags.map((tag) => (
              <Card>
                {tag.name}
              </Card>
            ))}
          </Box>
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Leadership
          </Heading>
          <Box>
            {leadershipTags.map((tag) => (
              <Card>
                {tag.name}
              </Card>
            ))}
          </Box>
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Personal
          </Heading>
          <Box>
            {personalTags.map((tag) => (
              <Card>
                {tag.name}
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}