import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { HStack, VStack } from "native-base";

export function Home() {
    return (
        <VStack>
            <HomeHeader />

            <HStack>
                <Group name='costas'/>
                <Group name='ombro'/>
            </HStack>
        </VStack>
    )
}