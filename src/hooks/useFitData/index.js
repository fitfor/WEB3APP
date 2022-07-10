import { useCallback, useEffect, useState } from "react";
import useFitPunks from "../usePunk/index";

// Plural
const useFitPunkData = () => {
  const [punks, setPunks] = useState([]);
  const [loading, setLoading] = useState(true);
  const fitPunk = useFitPunks();
  console.log("DATA")
  console.log(fitPunk)
  const update = useCallback(async () => {
    if (fitPunk) {
      setLoading(true);
      console.log("fitPunk");
      console.log(fitPunk);
      let tokenIds;
      const totalSupply = await fitPunk.methods.totalSupply().call();
      console.log("SUPPLY")
      console.log(totalSupply)
      //AArray IDS
      tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index);
      console.log("id")
      console.log(tokenIds)
      const punksPromise = tokenIds.map(tokenId =>
        getPunkData({ tokenId, fitPunk })
      );

      const punks = await Promise.all(punksPromise);
      console.log("PUNKS")
      console.log(punks)
      setPunks(punks);
      setLoading(false);
    }
  }, [fitPunk]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punks,
    update,
  };
};
const getPunkData = async ({ tokenId, fitPunk }) => {
  console.log("popo")
  console.log(fitPunk)
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
    fitPunk.methods.ownerOf(tokenId).call(),
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

  console.log("Is this the error?")
  console.log(tokenURI)
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


// Singular
// const usePlatziPunkData = () => {

// }

export { useFitPunkData };
