import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import fitPunksArtifact   from "../../config/web3/artifacts/FitPunks";

const { address, abi } = fitPunksArtifact;
const useFitPunks = () => {
  const { active, library, chainId } = useWeb3React();
  const fitPunks = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);
  
  return fitPunks;
};

export default useFitPunks;