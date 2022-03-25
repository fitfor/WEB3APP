import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  useToast
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import useFitPunks from "../../hooks/usePunk/index";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
  const [isMiting, setIsMinting]  = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const { active, account } = useWeb3React();
  const fitPunks = useFitPunks();
  const toast =useToast();

  const getFitPunksData = useCallback(async () => {
    if (fitPunks) {
      const totalSupply = await fitPunks.methods.totalSupply().call();
      const dnaPreview = await fitPunks.methods
        .deterministicPseudoRandom(totalSupply, account)
        .call();
      const image = await fitPunks.methods.imageByDNA(dnaPreview).call();
      setImageSrc(image);
    }
  }, [fitPunks, account]);

  useEffect(() => {
    getFitPunksData();
  }, [getFitPunksData]);

  const mint = () => {
    setIsMinting(true);
    fitPunks.methods
      .mint()
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        toast({
          title:"Transaction Sent",
          description:txHash ,
          status:'info'
        })
        setIsMinting(false);
      })
      .on("receipt", () => {
        toast({
          title:"Transaction Confirmed!!",
          description:"Keep training to make real money and show off your NFTS" ,
          status:'success'
        })
        setIsMinting(false);
      })
      .on("error", (err) => {
        toast({
          title:"This is an error :(",
          description:err.message,
          status:'error'
        })
        setIsMinting(false);
      });
  };

  return (
    <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            A fitPunk
          </Text>
          <br />
          <Text as={"span"} color={"green.400"}>
            FitPunk!
          </Text>
        </Heading>
        <Text color={"gray.500"}>Fitpunks is the future of excercise</Text>
        <Text color={"green.500"}>
          All the Fitpunks are generated as a consequence of your training and
          dedication to your well-being.
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"green"}
            bg={"green.400"}
            _hover={{ bg: "green.500" }}
            disabled={!fitPunks}
            onClick={mint}
          >
            Get your fit punk now!!
          </Button>
          <Link to="/punks">
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Gallery
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Image src={active ? imageSrc : "https://avataaars.io/"} />
        {active ? (
          <>
            <Flex mt={2}>
              <Badge>
                Next ID:
                <Badge ml={1} colorScheme="green">
                  1
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address:
                <Badge ml={1} colorScheme="green">
                  0x0000...0000
                </Badge>
              </Badge>
            </Flex>
            <Button
              onClick={getFitPunksData}
              mt={4}
              size="xs"
              colorScheme="green"
            >Update
            </Button>
          </>
        ) : (
          <Badge mt={2}>Wallet desconectado</Badge>
        )}
      </Flex>
    </Stack>
  );
};

export default Home;
