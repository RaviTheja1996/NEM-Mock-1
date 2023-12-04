import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Select,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { register, DeleteContact, EditContact } from "../Redux/action";
import axios from "axios";

const Contacts = () => {
  const [label, setLabel] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState([]);
  const [editObject, setEditObject] = useState({});
  const [editUserName, setEditUserName] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ label, email, username: name, phone })).then((res) => {
      toast({
        title: "Contact created.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
    tableDataFetch();
  };

  const handleEditSubmit = () => {
    console.log(editUserName, "in handleEditSubmit function");
    setEditObject({ label, email, username: name, phone });
    dispatch(EditContact(editUserName, editObject)).then(() => {
      toast({
        title: "Contact Edited successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
    tableDataFetch();
  };

  const handleEdit = (username) => {
    setEditUserName(username);
    console.log(username, " username in handleEdit function");
    console.log(editUserName, "in handleEdit function");
  };

  const handleDelete = (username) => {
    dispatch(DeleteContact(username)).then(() => {
      toast({
        title: "Contact Edited successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  const tableDataFetch = () => {
    axios.get("https://giddy-raincoat-bee.cyclic.app/users/").then((res) => {
      setData(res.data.contacts);
      console.log(res.data.contacts);
    });
  };

  useEffect(() => {
    tableDataFetch();
  }, []);

  return (
    <>
      <Flex justifyContent="center" mt="2rem" mb="2rem">
        <Button
          bgColor={"green"}
          color={"white"}
          _hover={{ bg: "green", color: "white" }}
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
          }}
          onClick={onOpen}
        >
          Add Contact
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>contacts</TableCaption>
          <Thead bgColor="#f2f2f2">
            <Tr>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Label</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 &&
              data.map((el, ind) => {
                return (
                  <Tr key={ind}>
                    <Td>{el.name}</Td>
                    <Td>{el.email}</Td>
                    <Td>{el.phone}</Td>
                    <Td>{el.label}</Td>
                    <Td>
                      <Flex justifyContent={"center"}>
                        <Button
                          bgColor={"#4caf50"}
                          color="white"
                          onClick={() => {
                            handleEdit(el.email);
                            onOpen();
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          bgColor={"#f44336"}
                          color="white"
                          onClick={() => {
                            handleDelete(el.username);
                          }}
                        >
                          Delete
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={"orange"}>Enter contact details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection={"column"}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <form>
                <label>Full Name :</label>
                <Input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Input>
                <label>Email :</label>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <label>Phone :</label>
                <Input
                  type="text"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></Input>
                <label>Label :</label>
                <Select
                  onChange={(e) => setLabel(e.target.value)}
                  value={label}
                >
                  <option value="">Reset</option>
                  <option value="work">work</option>
                  <option value="school">school</option>
                  <option value="friends">friends</option>
                  <option value="family">family</option>
                </Select>
              </form>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex justifyContent={"center"} w="100%">
              <Button colorScheme="blue" onClick={handleSubmit}>
                submit
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={"orange"}>
            Enter contact edit details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection={"column"}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <form>
                <label>Full Name :</label>
                <Input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Input>
                <label>Email :</label>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <label>Phone :</label>
                <Input
                  type="text"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></Input>
                <label>Label :</label>
                <Select
                  onChange={(e) => setLabel(e.target.value)}
                  value={label}
                >
                  <option value="">Reset</option>
                  <option value="work">work</option>
                  <option value="school">school</option>
                  <option value="friends">friends</option>
                  <option value="family">family</option>
                </Select>
              </form>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex justifyContent={"center"} w="100%">
              <Button colorScheme="blue" onClick={handleEditSubmit}>
                submit
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Contacts;
