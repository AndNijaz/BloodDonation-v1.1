import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { forwardRef } from "react";

type ButtonProps = {
  text: string;
  style?: any;
  textColor?: any;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...pressableProps}
        style={[styles.container, pressableProps?.style]}
      >
        <Text
          style={[styles.text, { color: pressableProps.textColor || "#fff" }]}
        >
          {text}
        </Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D61D23",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginLeft: 48,
    marginRight: 48,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Button;
