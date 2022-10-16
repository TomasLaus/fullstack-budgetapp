import { Stack, Text } from "@chakra-ui/react";
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi'
import theme from "../theme";

const MovementInfo = ({ id, concept, date, amount, type, setSelectedMovement, onOpenGenericDrawer }) => {


    let customDate = date.split('-').reverse().join('-')
    const { income, expense } = theme.colors

    const handleEdit = () => {
        setSelectedMovement({
            id: id,
            concept: concept,
            date: date,
            amount: amount,
            type: type,
        });
        onOpenGenericDrawer();
    }
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingX={5}
            paddingY={1}
            backgroundColor="white"
            border={type === 'income' ? `1px solid ${income}` : `1px solid ${expense}`}
            color={type === 'income' ? `${income}` : `${expense}`}
            borderRadius="md"
            _hover={{ backgroundColor: type === 'income' ? income : expense, color: "white", transition: "all ease 0.5s", cursor: "pointer" }}
            onClick={handleEdit}
        >
            <Stack direction="row" alignItems="center">
                {type === 'income' ? <GiReceiveMoney /> : <GiPayMoney />}
                <Stack alignItems="flex-start" spacing={0} justifyContent="flex-end">
                    <Text fontSize={16}>{concept}</Text>
                    <Text fontSize={12}> {customDate}</Text>
                </Stack>
            </Stack>

            <Stack
                alignItems="flex-end"
                spacing={0}
                paddingTop={2}
                justifyContent="flex-end"
            >
                {type === 'income' ? <Text fontSize={16}>${amount}</Text> : <Text fontSize={16}>- ${amount}</Text>}

            </Stack>
        </Stack>
    );
}

export default MovementInfo