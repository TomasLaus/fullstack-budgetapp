import { useState, useEffect } from 'react'
import {
  Stack,
  Text,
  Container,
  Button,
  Heading,
  StackDivider,
  useDisclosure,
  Spinner,
  useColorModeValue,
  ButtonGroup
  
} from "@chakra-ui/react";
import { AddIcon, ViewIcon, ViewOffIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import GenericDrawer from './components/GenericDrawer';
import MovementInfo from './components/MovementInfo';
import { getInfo, calculateBalance, filterInfo } from './utils/functions'
import alkemylogo from './alkemy.webp'

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

import {
  Box,
  SimpleGrid,
  Link
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';




function App() {
  const initialState = {
    id: "",
    concept: "",
    date: "",
    amount: 0,
    type: "",
  }

  //useDisclosures : 
  const {
    isOpen: isOpenGenericDrawer,
    onOpen: onOpenGenericDrawer,
    onClose: onCloseGenericDrawer,
  } = useDisclosure();

  //useStates : 
  const [visibleNumbers, setVisibleNumbers] = useState(false);
  const [originalInfo, setOriginalInfo] = useState([]);
  const [visibleInfo, setVisibleInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountBalance, setaccountBalance] = useState({
    balance: 0,
    incomes: 0,
    expenses: 0,
  })
  const [selectedMovement, setSelectedMovement] = useState(initialState);

  //useEffects : 
  useEffect(async () => {
    let result = await getInfo();
    setOriginalInfo(result)
    setVisibleInfo(result)
    setLoading(false)
  }, [])

  useEffect(() => {
    let result = calculateBalance(originalInfo)
    setaccountBalance(result)
  }, [originalInfo])




  //maps & aux functions
  const balanceInfo = [
    {
      header: "Balance",
      info: accountBalance.balance,
      add: false,
      eye: true,
    },
    {
      header: "Ingresos",
      info: accountBalance.incomes,
      add: true,
      eye: false,
      emptyMovement: {
        ...initialState,
        type: "income"
      },
      modal: onOpenGenericDrawer,
    },
    {
      header: "Gastos",
      info: accountBalance.expenses,
      add: true,
      eye: false,
      emptyMovement: {
        id: "",
        concept: "",
        date: "",
        amount: 0,
        type: "expense"
      },
      modal: onOpenGenericDrawer,
    },


  ]

  const filterButtons = [
    {
      key: 'incomeFilterButton',
      text: "Ingresos",
      hover: { backgroundColor: "income", color: "white", transition: "all ease 0.5s" },
      click: filterInfo(originalInfo, 'income')
    },
    {
      key: 'clearFiltersButton',
      text: "Ver todo",
      hover: { backgroundColor: "blue.600", color: "white", transition: "all ease 0.5s" },
      click: filterInfo(originalInfo, '')
    },
    {
      key: 'expenseFilterButton',
      text: "Gastos",
      hover: { backgroundColor: "expense", color: "white", transition: "all ease 0.5s" },
      click: filterInfo(originalInfo, 'expense')
    },
  ]





  return (
    <Stack
    >
    <Container
      backgroundColor="bgHome"
      justifyContent="center"
      maxWidth={{ base: "100%", sm: "container.sm" }}
      paddingTop={2}
    >
      <Stack divider={<StackDivider />}>
        <Stack
          alignItems="center"
          borderColor="boxesBorders"
          borderRadius="md"
          borderWidth={2}
          justifyContent="center"
          paddingY={2}
          flexDirection="row"

        >
          <Heading fontSize={26} letterSpacing={1} flexDirection="row">
            <img src={alkemylogo} width='100px'  alt="alkemy logo" style={{display: 'block', margin: '0 auto'}} /> 
            <Heading >Personal Budget</Heading>
          </Heading>

        </Stack>
        <Stack color="white" letterSpacing={1}>
          {balanceInfo.map(element => {
            return (
              <Stack
                backgroundColor="boxes"
                borderRadius="md"
                justifyContent="center"
                paddingX={5}
                paddingY={5}
                key={element.header}
                _hover={{ backgroundColor:"lightblue", color: "gray", transition: "all ease 0.5s"}}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  paddingRight={1}
                  borderRadius="md"
                >
                  <Heading fontSize={22}>{element.header}</Heading>
                  {element.add ? <AddIcon cursor="pointer" h={3} w={3} onClick={() => {
                    setSelectedMovement(element.emptyMovement)
                    onOpenGenericDrawer();
                  }} /> : null}

                </Stack>

                {visibleNumbers ? (
                  <Stack direction="row" letterSpacing={1} justifyContent="space-between">
                    {element.info >= 0 ? <Text fontSize={20} >${element.info}</Text> : <Text fontSize={16}>- ${element.info * -1}</Text>}

                    {element.eye ? <ViewIcon cursor="pointer" h={5} w={5} onClick={() => setVisibleNumbers(false)} /> : null}

                  </Stack>
                ) : (
                  <Stack direction="row" justifyContent="space-between">
                    <Text fontSize={16}>*****</Text>
                    {element.eye ? <ViewOffIcon cursor="pointer" h={5} w={5} onClick={() => setVisibleNumbers(true)} /> : null}

                  </Stack>
                )}
              </Stack>
            )
          })}
        </Stack>
      </Stack>

      <ButtonGroup flexDirection="row" justifyContent="center" width="full" paddingTop={4} gap={6}>
        {filterButtons.map(element => {
          return (
            <Button key={element.key} colorScheme="whatsapp" fontSize={14} variant="outline" _hover={element.hover}
              onClick={() => {
                let result = element.click;
                setVisibleInfo(result);
              }}
            >
              {element.text}
            </Button>
          )
        })}

      </ButtonGroup>


      {loading ? <Stack justifyContent="center" paddingTop={10} alignItems="center">
        <Spinner color={"green.500"} size="xl" />
      </Stack> : visibleInfo.length ? <Stack color="white" paddingTop={4}>
        {
          visibleInfo.map(element => {
            return (
              <MovementInfo
                key={element.id}
                id={element.id}
                amount={element.amount}
                concept={element.concept}
                date={element.date}
                type={element.type}
                onOpenGenericDrawer={onOpenGenericDrawer}
                setSelectedMovement={setSelectedMovement}
              />
            );
          }).slice(0, 10)}
      </Stack> : <Stack justifyContent="center" paddingTop={10} alignItems="center" flexDirection="column"> <Text textAlign="center">No hay movimientos para mostrar.
      </Text><Text>Carga tu primer movimiento desde el icono " + " correspondiente.</Text></Stack>}

      <GenericDrawer
        isOpen={isOpenGenericDrawer}
        onClose={onCloseGenericDrawer}
        onOpen={onOpenGenericDrawer}
        item={selectedMovement}
        setSelectedMovement={setSelectedMovement}
        setOriginalInfo={setOriginalInfo}
        setVisibleInfo={setVisibleInfo}
        originalInfo={originalInfo}
        setLoading={setLoading}
      />






    </Container>


    <Stack
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link href={'#'}>About Us</Link>
            <Link href={'#'}>Blog</Link>
            <Link href={'#'}>Careers</Link>
            <Link href={'#'}>Contact Us</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Safety Center</Link>
            <Link href={'#'}>Community Guidelines</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Link href={'#'}>Cookies Policy</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Law Enforcement</Link>
          </Stack>

        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          <Text>©  Tomas Laus - Alkemy (Fullstack JS Challenge). All rights reserved</Text>

        </Container>
      </Box>
    </Stack>


    </Stack>
  )
}

export default App
