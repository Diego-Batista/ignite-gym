import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { FlatList, HStack, Heading, Text, Toast, VStack } from "native-base";
import { useEffect, useState } from "react";

export function Home() {
    const [group, setGroup] = useState<string[]>([]) 
    const [exercises, setExercises] = useState(['remada frontal', 'remada unilateral', 'puxada frente', 'terra']) 
    const [groupSelected, setGroupSelected] = useState('costas')

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenExercisesDetails() {
        navigation.navigate('exercise')
    }

    async function fetchGroups() {
        try {
          const response = await api.get('/groups');
          setGroup(response.data);
          console.log(response.data)
    
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';
    
          Toast.show({
            title,
            placement: 'top',
            bgColor: 'red.500'
          })
        }
      }
    
      useEffect(() => {
        fetchGroups();
      },[])

    return (
        <VStack >
            <HomeHeader />

            <FlatList 
                data={group}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group 
                        name={item}
                        isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={10}
                maxH={10}
                minH={10}
            />

            <VStack px={8}>
                <HStack justifyContent="space-between" mb={5}>
                    <Heading color="gray.200" fontSize="md" fontFamily="heading">
                        Exercícios
                    </Heading>

                    <Text color="gray.200" fontSize="sm">
                        {exercises.length}
                    </Text>
                </HStack>

                <FlatList 
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ExerciseCard 
                            onPress={handleOpenExercisesDetails}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{
                        paddingBottom: 20
                    }}
                />
            </VStack>
        </VStack>
    )
}