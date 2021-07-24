import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_mMod67U43",
    ClientId: "2kil5ugm4i6659im1eqg99sl2f"
}

export default new CognitoUserPool(poolData);