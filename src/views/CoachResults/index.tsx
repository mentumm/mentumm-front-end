import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { menApiAuthClient } from "../../clients/mentumm";
import Coach from "../../components/Coach";
import PageWrapper from "../../components/Wrappers/PageWrapper";
import { Tag, CoachType } from "../../types";

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    display: "flex",
    width: "100%",
    margin: "auto",
    flexFlow: "column",
  },
  coaches: {
    display: "flex",
    flexFlow: "row wrap",
    width: "95%",
    margin: "auto",
    justifyContent: "center",
    gap: "16px",
  },
  resultHeading: {
    margin: "40px 40px",
    flexFlow: "row ",
    width: "auto",
    justifyContent: "flex-start",
  },
}));

export const generateCoachUrl = (coach: CoachType) => {
  const name = `${coach.first_name} ${coach.last_name}`;
  return name.replace(/\W|_/g, "-").toLowerCase() + `-${coach.id}`;
};

const CoachResults: React.FC = () => {
  const classes = useStyles();
  const windowUrl = window.location.toString().toLowerCase();
  const slug = windowUrl.substring(windowUrl.lastIndexOf("/") + 1);
  const [coaches, setCoaches] = useState<CoachType[] | null>(null);

  const pageHeading = () => {
    return coaches.length
      ? coaches[0].expertise.find((tag: Tag) => tag.slug === slug)?.name
      : "";
  };

  useEffect(() => {
    const loadCoaches = async () => {
      try {
        const coach = await menApiAuthClient().get("/tags?kind=expertise", {
          params: {
            slug: slug,
          },
        });

        if (coach) {
          setCoaches(coach.data);
        }
      } catch (error) {
        throw new Error("Could not load Coach Tags!");
      }
    };

    if (!coaches && slug) {
      loadCoaches();
    }
  }, [coaches, slug]);

  return (
    <PageWrapper
      title={coaches ? `Pick a ${pageHeading()} Coach` : ""}
      backTo="/search"
    >
      <div className={classes.root}>
        <div className={classes.coaches}>
          {!!coaches && coaches.length ? (
            coaches.map(
              (coach: CoachType) =>
                !coach.is_test && <Coach coachInfo={coach} slug={slug} />
            )
          ) : (
            <Heading as="h1" size="2xl">
              Searching
            </Heading>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default CoachResults;
