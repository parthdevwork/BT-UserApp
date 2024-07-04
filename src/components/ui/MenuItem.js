import { Text, Pressable } from 'react-native';

const MenuItem = ({ Icon, title, selected = false, disabled = false, onPress }) => {
    return (
        <Pressable
            className={["items-center justify-center rounded-full flex-1", selected ? "flex-row bg-[#FFCC00] py-1.5 space-x-1.5" : "opacity-30 space-y-1"].join(" ")}
            onPress={selected ? undefined: onPress}
            disabled={disabled}
        >
            {Icon}
            <Text className="font-montserrat-500 text-[9px]">{title}</Text>
        </Pressable>
    );
};

export default MenuItem;