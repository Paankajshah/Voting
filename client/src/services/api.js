import axios from "axios";

export const candidateData = async () => {
  const response = await axios.get("http://localhost:5000/voting/candidates");
  const data = {
    data:response.data
  };
  return data;
};
export const voterData = async () => {
  const response = await axios.get("http://localhost:5000/voting/voters");
  console.log("daata ", response.data);
  const data = {
    data:response.data
  };
  return data;
};

export default { candidateData, voterData };
