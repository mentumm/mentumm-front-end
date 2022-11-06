import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React, {useState } from "react";
import { mixpanelEvent } from "../../helpers";
import { useGetTags } from "../../helpers/tagHelpers";
import { ReviewFormProps } from "../../types";
import Rating from "./Rating";

const ReviewForm: React.FC<ReviewFormProps> = ({
  submitForm,
  coach,
  currentUser,
  userCoachId,
}) => {
  const coachTags = useGetTags();
  const [topic, setTopic] = useState<string>("");
  const [listeningRating, setListeningRating] = useState<number>(0);
  const [overallRating, setOverallRating] = useState<number>(0);
  const [learnFromCoach, setLearnFromCoach] = useState<string>("yes");
  const [bookCoachAgain, setBookCoachAgain] = useState<string>("yes");
  const [additionalComments, setAddtionalComments] = useState<string>("");
  const [overallRatingError, setOverallRatingError] = useState<boolean>(false);
  const [listeningError, setListeningError] = useState<boolean>(false);
  const [tagError, setTagError] = useState<boolean>(false);

  const selectTag = (e) => {
    setTopic(e.target.value);
  };

  const handleCommentChange = (e) => {
    const inputValue = e.target.value;
    setAddtionalComments(inputValue);
  };

  const validateForm = (e) => {
    e.preventDefault();

    if (overallRating === 0) setOverallRatingError(true);
    if (listeningRating === 0) setListeningError(true);
    if (!topic) setTagError(true);

    if (overallRating === 0 || listeningRating === 0 || !topic) return;
    if (overallRatingError || listeningError || tagError) return;

    // submit form information
    const review = {
      user_id: currentUser.id,
      coach_id: coach.id,
      rating_overall: overallRating,
      rating_listening: listeningRating,
      additional_comments: additionalComments,
      primary_topic: topic,
      user_learned: learnFromCoach === "yes" ? true : false,
      user_would_book_again: bookCoachAgain === "yes" ? true : false,
      user_coach_id: userCoachId,
    };

    mixpanelEvent("Coach Review", { ...review, coach_name: coach.name });
    submitForm(review);
  };

  return (
    <form style={{ marginTop: "15px" }} onSubmit={validateForm}>
      <Stack spacing="6">
        <SimpleGrid columns={2} spacing={2}>
          <RadioGroup onChange={setLearnFromCoach} value={learnFromCoach}>
            <Text>Did you learn from this coach?</Text>
            <Stack direction="row">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Stack>
          </RadioGroup>
          <RadioGroup onChange={setBookCoachAgain} value={bookCoachAgain}>
            <Text>Would you book this coach again?</Text>
            <Stack direction="row">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Stack>
          </RadioGroup>
        </SimpleGrid>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          <GridItem>
            <FormControl id="overall-rating" isInvalid={overallRatingError}>
              <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
                Overall Rating
              </FormLabel>
              <Rating
                size="4xl"
                setRating={setOverallRating}
                rating={overallRating}
                setErrors={setOverallRatingError}
              />
              {!overallRatingError ? null : (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  This rating is required.
                </FormErrorMessage>
              )}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="listening-rating" isInvalid={listeningError}>
              <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
                Listening Rating
              </FormLabel>
              <Rating
                size="4xl"
                setRating={setListeningRating}
                rating={listeningRating}
                setErrors={setListeningError}
              />
              {!listeningError ? null : (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  This rating is required.
                </FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
        </Grid>
        <FormControl id="topic" isInvalid={tagError}>
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            What was the primary topic you discussed?
          </FormLabel>
          <Select
            placeholder="Select a topic..."
            onChange={(e) => {
              setTagError(false);
              selectTag(e);
            }}
          >
            {coachTags && coachTags.length
              ? coachTags.map((tag) => (
                  <option value={tag.slug} key={tag.id}>
                    {tag.name}
                  </option>
                ))
              : null}
          </Select>

          {!tagError ? null : (
            <FormErrorMessage style={{ marginBottom: "6px" }}>
              Topic is required.
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="comment">
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            Additional Comments
          </FormLabel>
          <Textarea
            name="comment"
            placeholder="Your comments"
            rows={4}
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            resize="none"
            value={additionalComments}
            onChange={handleCommentChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="brand" alignSelf="start" size="lg">
          Submit Review
        </Button>
      </Stack>
    </form>
  );
};

export default ReviewForm;
