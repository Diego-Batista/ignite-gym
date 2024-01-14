import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack } from "native-base";

export function Home() {
    return (
        <VStack>
            <HomeHeader />

            <Group name='costas'/>
        </VStack>
    )
}