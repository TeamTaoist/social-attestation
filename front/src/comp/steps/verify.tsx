import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useWeb3React } from "@web3-react/core";
import { useStepContext } from "../../providers/stepProvider";

import { oauthTwitter } from "../../api/oauth";
import useSubcribe from "../useSubscribe";
import { TWITTER_APP_CLIENT_ID, TWITTER_REDIRECT_URL, LOCAL_OAUTH_KEY } from "../../constants";


interface IProps {
  handleBack: () => void;
  handleNext: () => void;
}

export default function VerifyStep({ handleBack, handleNext }: IProps) {
  const { account, provider } = useWeb3React();
  const { state: { twitter_data } } = useStepContext();
  const onClickBack = () => {
    // do sth before go to back step if you want
    handleBack();
  };

  const onClickNext = () => {
    // do sth before go to next step if you want
    handleNext();
  };

  const onClickVerify = async () => {
    if (!provider) {
      return;
    }

    console.log(twitter_data);

    // sign msg
    const signData = await provider.send("personal_sign", ["", account]);


    await oauthTwitter(twitter_data.code, TWITTER_REDIRECT_URL, account!);
  };
  return (
    <VerifyStepStyle>
      <Button variant="contained" color="primary" onClick={onClickVerify}>
        Verify
      </Button>
      <OptionBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button color="inherit" onClick={onClickBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={onClickNext}>Next</Button>
      </OptionBox>
    </VerifyStepStyle>
  );
}

const VerifyStepStyle = styled.div``;

const OptionBox = styled(Box)`
  position: fixed;
  right: 80px;
  bottom: 60px;
`;
