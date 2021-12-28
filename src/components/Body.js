/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChatIcon,
  CheckIcon,
  ExternalLinkIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  CloseButton,
  DarkMode,
  Flex,
  IconButton,
  LightMode,
  Link,
  SlideFade,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  Textarea,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import Graph from "react-graph-vis";
import useResizeObserver from "use-resize-observer";
import * as C from "../constants";
import { GraphContext, UserContext } from "../Contexts";
import CategoryTagStack from "./CategoryTagStack";
import LoadingGraph from "./LoadingGraph";

const Body = (props) => {
  const {
    graph,
    aprobar,
    setNetwork,
    redraw,
    setNodes,
    setEdges,
    desaprobar,
    getNode,
    edges,
    loadingGraph,
    network,
    openCBC,
  } = React.useContext(GraphContext);
  const { user, logged, submitBug } = React.useContext(UserContext);
  const { setDisplayedNode } = props;
  const toast = useToast();
  const bugToast = React.useRef();
  const [showGracias, setShowGracias] = React.useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const ref = useRef(null);
  const { width, height } = useResizeObserver({ ref });

  useEffect(redraw, [width, height]);

  const events = {
    click: (e) => {
      const id = e.nodes[0];
      if (id === "CBC") {
        openCBC();
        return;
      }
      const node = getNode(id);
      if (!node) {
        if (logged) setDisplayedNode("");
        return;
      }
      if (logged) {
        setDisplayedNode(id);
        return;
      }
      if (!node.aprobada) {
        aprobar(id, 4);
      } else {
        desaprobar(id);
      }
    },
    doubleClick: (e) => {
      const id = e.nodes[0];
      if (!logged) return;
      if (id === "CBC") return;
      const node = getNode(id);
      if (!node) return;
      setDisplayedNode(id);
      if (!node.aprobada) {
        aprobar(id, 4);
      } else {
        desaprobar(id);
      }
    },
    hold: (e) => {
      const id = e.nodes[0];
      if (!logged) return;
      if (id === "CBC") return;
      const node = getNode(id);
      if (!node) return;
      setDisplayedNode(id);
      if (!(node.nota === -1)) {
        aprobar(id, -1);
      } else {
        desaprobar(id);
      }
    },
    hoverNode: (e) => {
      const id = e.node;

      // ### Este codigo triguerea un update en nodes, haciendo que se re-renderice el grafo como cuando se aprueba una materia. Si estuviese la fisica prendida, esto no pasaria
      // const neighborNodes = network.getConnectedNodes(id);
      // const allOtherNodes = nodes.get({
      //   filter: function (node) {
      //     return !neighborNodes.includes(node.id) && !(node.id === id);
      //   },
      // });
      // nodes.update(
      //   allOtherNodes.map((node) => {
      //     node.opacity = 0.6;
      //     return node;
      //   })
      // );

      const neighborEdges = network.getConnectedEdges(id);
      const allOtherEdges = edges.get({
        filter: function (edge) {
          return !neighborEdges.includes(edge.id);
        },
      });
      edges.update(
        allOtherEdges.map((edge) => {
          edge.arrows = { to: { enabled: false } };
          edge.dashes = true;
          edge.color = { opacity: 0.6 };
          return edge;
        })
      );
    },
    blurNode: (e) => {
      const id = e.node;
      // ### Este codigo triguerea un update en nodes, haciendo que se re-renderice el grafo como cuando se aprueba una materia. Si estuviese la fisica prendida, esto no pasaria
      // const neighborNodes = network.getConnectedNodes(id);
      // const allOtherNodes = nodes.get({
      //   filter: function (node) {
      //     return !neighborNodes.includes(node.id) && !(node.id === id);
      //   },
      // });
      // nodes.update(
      //   allOtherNodes.map((node) => {
      //     node.opacity = undefined;
      //     return node;
      //   })
      // );

      const neighborEdges = network.getConnectedEdges(id);
      const allOtherEdges = edges.get({
        filter: function (edge) {
          return !neighborEdges.includes(edge.id);
        },
      });
      edges.update(
        allOtherEdges.map((edge) => {
          edge.arrows = { to: { enabled: true } };
          edge.dashes = false;
          edge.color = null;
          return edge;
        })
      );
    },
  };

  return (
    <Box
      ref={ref}
      css={{ "& *:focus": { outline: "none" } }}
      bg={useColorModeValue("graphbg", "graphbgdark")}
      flexGrow="1"
      height="1em"
      position="relative"
    >
      <SlideFade in={loadingGraph} unmountOnExit>
        <LoadingGraph />
      </SlideFade>
      <Graph
        key={user.carrera?.id}
        graph={graph}
        getNetwork={(r) => {
          setNetwork(r);
        }}
        getNodes={(r) => {
          r.carrera = user.carrera?.id;
          setNodes(r);
        }}
        getEdges={(r) => {
          setEdges(r);
        }}
        options={C.GRAPHOPTIONS}
        events={events}
      />
      <CategoryTagStack />
      <Box
        mb={3}
        textAlign="right"
        mr={2}
        bottom={0}
        right={0}
        position="absolute"
      >
        <Tooltip
          label={`${useColorModeValue("Dark", "Light")} theme`}
          placement="top"
        >
          <Link
            color={useColorModeValue("text", "textdark")}
            onClick={toggleColorMode}
          >
            {useColorModeValue(<MoonIcon />, <SunIcon />)}
          </Link>
        </Tooltip>
        <LightMode>
          <Box>
            <Tag
              mt={2}
              variant="subtle"
              cursor="pointer"
              bg="#e9eaeb"
              onClick={() => {
                toast.close(bugToast.current);
                return (bugToast.current = toast({
                  render: (props) => (
                    <Alert
                      borderRadius={6}
                      p={5}
                      mb="4em"
                      borderColor={
                        colorMode === "dark" ? "electivas.400" : "electivas.500"
                      }
                      borderWidth={2}
                      bg={colorMode === "dark" ? "gray.700" : "gray.50"}
                      color={colorMode === "dark" ? "textdark" : "text"}
                    >
                      <Box flex="1">
                        <AlertTitle>Hola!</AlertTitle>
                        <AlertDescription px={5} display="block">
                          <Text>
                            Si encontrás algo feo, incorrecto, lento, erroneo...
                            me decís?
                          </Text>
                          <Text>
                            Si ves algo que te gustó, o tenes alguna sugerencia,
                            también!
                          </Text>
                          <Text>
                            Si querés que te responda, escribí tu
                            mail/telegram/algo.
                          </Text>
                          <form
                            onSubmit={(t) => {
                              t.preventDefault();
                              submitBug(t.target.elements["bug"].value);
                              setShowGracias(true);
                              toast.close(bugToast.current);
                            }}
                          >
                            <Flex mt={3} alignItems="flex-end">
                              <Textarea
                                resize="none"
                                borderColor={
                                  colorMode === "dark" ? "textdark" : "text"
                                }
                                color={
                                  colorMode === "dark" ? "textdark" : "text"
                                }
                                focusBorderColor={
                                  colorMode === "dark"
                                    ? "electivas.400"
                                    : "electivas.500"
                                }
                                size="sm"
                                name="bug"
                              />
                              <DarkMode>
                                <IconButton
                                  ml={3}
                                  colorScheme="purple"
                                  size="sm"
                                  type="submit"
                                  icon={<ChatIcon />}
                                />
                              </DarkMode>
                            </Flex>
                          </form>
                          <Text fontSize="sm" mt={2}>
                            ¿Usás Github? me ayudás mucho más levantando un
                            issue{" "}
                            <Link
                              isExternal
                              _hover={{
                                color:
                                  colorMode === "dark"
                                    ? "electivas.400"
                                    : "electivas.500",
                              }}
                              href="https://github.com/minennai"
                            >
                              directamente{" "}
                              <ExternalLinkIcon
                                color={
                                  colorMode === "dark"
                                    ? "electivas.400"
                                    : "electivas.500"
                                }
                                mx="2px"
                              />
                            </Link>
                          </Text>
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        color={
                          colorMode === "dark"
                            ? "electivas.400"
                            : "electivas.500"
                        }
                        onClick={() => toast.close(props.id)}
                        position="absolute"
                        right="8px"
                        top="8px"
                      />
                    </Alert>
                  ),
                  status: "info",
                  position: "bottom",
                  duration: null,
                  isClosable: true,
                }));
              }}
            >
              <TagLabel>{showGracias ? "Gracias!" : "Sugerencias"}</TagLabel>
              <TagRightIcon as={showGracias ? CheckIcon : ChatIcon} />
            </Tag>
          </Box>
        </LightMode>
      </Box>
    </Box>
  );
};

export default Body;
