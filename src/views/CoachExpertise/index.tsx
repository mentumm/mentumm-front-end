import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { menApiAuthClient } from '../../clients/mentumm';
import envConfig from '../../envConfig';
import { Tag } from '../../types';
import { CurrentUser } from '../../types';
import { useNavigate } from 'react-router';
import { TagsSection } from './components';
import PageWrapper from '../../components/Wrappers/PageWrapper';


type CoachExpertiseProps = {
  currentUser: CurrentUser;
};

const CoachExpertise: React.FC<CoachExpertiseProps> = ({
  currentUser
}) => {
  const navigate = useNavigate();
  const [professionalTags, setProfessionalTags] = useState({ category: "Professional", data: [] });
  const [leadershipTags, setLeadershipTags] = useState({ category: "Leadership", data: [] });
  const [personalTags, setPersonalTags] = useState({ category: "Personal", data: [] });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

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
        throw new Error("Could not load Expertise Tags!");
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
        kind: 'expertise',
        user_id: currentUser.id,
        clear: true,
      })
      .then(() => {
        navigate(`/coach/${currentUser.id}/profile`);
      })
      .finally(() => {
        setSaving(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <PageWrapper>
      <Container maxW={1270}>
        <Heading size="lg" textAlign="left" my={8}>
          Pick up to 6 Areas of Expertise
        </Heading>
        {loading ? <Center><Spinner /></Center> :
          (<Box>
            <TagsSection
              tags={professionalTags}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
            <TagsSection
              tags={leadershipTags}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
            <TagsSection
              tags={personalTags}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </Box>)
        }

        <Button
          color="#fff"
          w="232px"
          _hover={{ bg: "#3CA8AB" }}
          mt={8}
          padding={7}
          fontWeight="bold"
          isDisabled={selectedItems.length < 6 || saving}
          onClick={handleContinue}
        >
          SAVE {saving && <Spinner ml={1} size="xs" />}
        </Button>
      </Container>
    </PageWrapper>
  )
}

export default CoachExpertise;