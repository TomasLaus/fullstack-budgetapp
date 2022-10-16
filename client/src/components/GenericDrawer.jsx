import React, { useEffect, useState } from 'react'
import {
    Stack,
    Button,
    FormControl,
    FormLabel,
    Input,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useToast,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'

import { postMovement, deleteMovement, updateMovement } from '../utils/functions'

const GenericDrawer = ({ isOpen, onClose, item, setSelectedMovement, originalInfo, setOriginalInfo, setVisibleInfo, setLoading }) => {

    const initialState = {
        id: "",
        concept: "",
        date: "",
        amount: 0,
        type: "",
    }
    //useStates :
    const [modifiedMovement, setModifiedMovement] = useState(initialState)
    //useDisclosures :
    const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure()
    //useEffects : 
    useEffect(() => {
        isOpen ? setModifiedMovement(item) : setModifiedMovement(initialState)
    }, [isOpen])
    //initializations : 
    const toast = useToast()

    //functions & aux : 
    const cleanAndClose = () => {
        setSelectedMovement(initialState);
        setModifiedMovement(initialState)
        setLoading(false);
        onClose();
    }


    const deleteLocalMovement = (originalArr, compareObj) => {
        let newMovements = [...originalArr];
        newMovements = newMovements.filter(item => item.id !== compareObj.id)
        setOriginalInfo(newMovements)
        setVisibleInfo(newMovements)
        onCloseAlert();
        cleanAndClose();
    }

    const updateLocalMovement = (originalArr, modifiedObj) => {
        let newMovements = [...originalArr];
        let index = newMovements.findIndex(item => item.id === modifiedMovement.id)
        newMovements[index] = modifiedObj;
        setOriginalInfo(newMovements)
        setVisibleInfo(newMovements)
        console.log('done update')
    }

    const postLocalMovement = (originalArr, objAdded) => {
        let newMovements = [...originalArr, objAdded];
        newMovements.sort((a, b) => b.id - a.id)
        setOriginalInfo(newMovements)
        setVisibleInfo(newMovements)
        console.log('done post')
    }
    const setTitle = (obj) => {
        if (obj.type === "income") {
            if (obj.id) {
                return "Modificar ingreso"
            }
            return "Nuevo ingreso"
        }
        if (obj.type === "expense") {
            if (obj.id) {
                return "Modificar gasto"
            }
            return "Nuevo gasto"
        }
    }


    return (
        <Drawer
            isOpen={isOpen}
            placement={{ base: "top", sm: "right" }}
            onClose={cleanAndClose}
        >
            <DrawerOverlay />
            <DrawerContent maxWidth={{ base: "100%", sm: "30%" }} height="100%">
                <DrawerCloseButton />
                <DrawerHeader marginTop={5} fontSize={24}>{setTitle(item)}</DrawerHeader>

                <DrawerBody>
                    <Stack spacing={10}>
                        <FormControl isRequired>
                            <FormLabel textAlign="left" fontSize={20}>Concepto</FormLabel>
                            <Input type="text" size="xs" name='concept' defaultValue={item.concept} fontSize={18} height={8} onChange={(e) => {
                                setModifiedMovement({
                                    ...modifiedMovement,
                                    concept: e.target.value
                                })
                            }} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel textAlign="left" fontSize={20}>Fecha</FormLabel>
                            <Input type="date" size="xs" name='date' defaultValue={item.date} fontSize={18} height={8} onChange={(e) => {
                                setModifiedMovement({
                                    ...modifiedMovement,
                                    date: e.target.value
                                })
                            }} />

                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel textAlign="left" fontSize={20}>Total</FormLabel>
                            <Input type="number" size="xs" name='total' defaultValue={item.amount} fontSize={18} height={8} onChange={(e) => {
                                setModifiedMovement({
                                    ...modifiedMovement,
                                    amount: Number(e.target.value)
                                })
                            }} />
                        </FormControl>
                    </Stack>




                    <AlertDialog
                        isOpen={isOpenAlert}
                        onClose={onCloseAlert}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Eliminar movimiento
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    ¿Estas seguro? Esta accion no se puede deshacer.
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button onClick={onCloseAlert}>
                                        Cancelar
                                    </Button>
                                    <Button colorScheme='red' onClick={async () => {
                                        await deleteMovement(modifiedMovement, toast);
                                        deleteLocalMovement(originalInfo, modifiedMovement)
                                    }} ml={3}>
                                        Eliminar
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>

                </DrawerBody>

                <DrawerFooter justifyContent="space-between" alignItems="baseline">
                    <Stack>
                        <Button colorScheme='red'
                            onClick={onOpenAlert}
                            isDisabled={item.concept.length &&
                                item.date.length && item.amount
                                ? false : true}
                        >Eliminar</Button>
                    </Stack>
                    <Stack flexDirection="row" alignItems="baseline">
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='green'
                            onClick={async () => {
                                if (modifiedMovement.id) {
                                    await updateMovement(modifiedMovement, toast)
                                    updateLocalMovement(originalInfo, modifiedMovement)
                                }
                                else {
                                    let result = await postMovement(modifiedMovement, toast);
                                    postLocalMovement(originalInfo, result)
                                }
                                cleanAndClose();
                            }}
                            isDisabled={modifiedMovement.concept.length &&
                                modifiedMovement.date.length && modifiedMovement.amount > 0
                                ? false : true}
                        >{item.concept ? "Modificar" : "Guardar"}</Button></Stack>


                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default GenericDrawer
