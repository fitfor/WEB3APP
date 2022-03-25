import { useCallback, useEffect, useState } from "react";
import useFitPunks from "../usePunk/index";

const getPunkData = async ({ tokenId, fitPunk }) => {
  const [
    tokenURI,
    dna,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    fitPunk.methods.tokenURI(tokenId).call(),
        fitPunk.methods.tokenDNA(tokenId).call(),
    fitPunk.methods.ownerOf(fitPunk).call(),
    fitPunk.methods.getAccessoriesType(tokenId).call(),
    fitPunk.methods.getAccessoriesType(tokenId).call(),
    fitPunk.methods.getClotheColor(tokenId).call(),
    fitPunk.methods.getClotheType(tokenId).call(),
    fitPunk.methods.getEyeType(tokenId).call(),
    fitPunk.methods.getEyeBrowType(tokenId).call(),
    fitPunk.methods.getFacialHairColor(tokenId).call(),
    fitPunk.methods.getFacialHairType(tokenId).call(),
    fitPunk.methods.getHairColor(tokenId).call(),
    fitPunk.methods.getHatColor(tokenId).call(),
    fitPunk.methods.getGraphicType(tokenId).call(),
    fitPunk.methods.getMouthType(tokenId).call(),
    fitPunk.methods.getSkinColor(tokenId).call(),
    fitPunk.methods.getTopType(tokenId).call(),
  ]);

  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    tokenURI,
    dna,
    owner,
    ...metadata,
  };
};

// Plural
const useFitPunkData = () => {
  const [punks, setPunks] = useState([]);
  const [loading, setLoading] = useState(true);
  const punksData = useFitPunks();

  const update = useCallback(async () => {
    if (punksData) {
      setLoading(true);
      console.log("CONTRACT");
      console.log(punksData);
      let tokenIds;
      const totalSupply = await punksData.methods.totalSupply().call();
      tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index);
      const punksPromise = tokenIds.map(tokenId =>
        getPunkData({ tokenId, punksData })
      );

      const punks = await Promise.all(punksPromise);
      setPunks(punks);
      setLoading(false);
    }
  }, [punksData]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punks,
    update,
  };
};

// Singular
// const usePlatziPunkData = () => {

// }

export { useFitPunkData };
