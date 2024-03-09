/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { InfiniteSocialsResponseType } from "../../utils/queries";
import SectionHeading from "../SectionHeading";

const SocialsFeed = (props: { socialEmbeds: InfiniteSocialsResponseType }) => {
  const socialEmbeds = props.socialEmbeds;

  return (
    <>
      <SectionHeading title={"What's trending"} />

      {socialEmbeds.pages.map((group, index) => {
        return (
          <Fragment key={index}>
            {group.data.map((social, index) => (
              <div
                key={social.id}
                sx={{
                  paddingBottom: 1,
                  backgroundColor: index % 2 === 0 ? "white" : "gray300",
                }}
              >
                {social.attributes.title && (
                  <p
                    sx={{
                      paddingX: 3,
                      paddingTop: index === 0 ? 0 : 3,
                      paddingBottom: 1,
                      variant: "text.heading4",
                      fontWeight: "500",
                    }}
                  >
                    {social.attributes.title}
                  </p>
                )}

                {/* <SocialsBlockPicker
                  type={social.attributes.type}
                  socialId={social.attributes.social_id}
                /> */}
              </div>
            ))}
          </Fragment>
        );
      })}
    </>
  );
};

export default SocialsFeed;
