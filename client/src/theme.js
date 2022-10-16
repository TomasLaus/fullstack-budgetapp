import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
    styles: {
        global: {
            body: {
                bg: "whitesmoke",
            }
        }
    },
    colors: {
        boxesBorders: theme.colors.blue[300],
        boxes: theme.colors.blue[300],
        bgHome: theme.colors.white[200],
        income: theme.colors.green[400],
        expense: theme.colors.red[600],
    },
});
