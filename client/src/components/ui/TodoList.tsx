import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";

import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";


export type Todo = {
    _id: number,
    body: string,
    completed: boolean;
}

const TodoList = () => {
	const { data: todos, isLoading } = useQuery<Todo[]>({
		queryKey: ["todos"],
		queryFn: async () => {
			try {
				const res = await fetch("http://localhost:8080/api/todos");
				const data = await res.json();
	
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data || [];  // ✅ Ensuring an array is returned
			} catch (error) {
				console.error("Fetch error:", error);
				return [];  // ✅ Returning an empty array to prevent 'undefined'
			}
		}
	});
	return (
		<>
			<Text 
    fontSize={"4xl"} 
    textTransform={"uppercase"} 
    fontWeight={"bold"} 
    textAlign={"center"} 
    my={2}
    bgGradient='linear(to-r, #0b85f8, #00ffff)' 
    bgClip="text"
>
				Today's Tasks
			</Text>
			{isLoading && (
				<Flex justifyContent={"center"} my={4}>
					<Spinner size={"xl"} />
				</Flex>
			)}
			{!isLoading && todos?.length === 0 && (
				<Stack alignItems={"center"} gap='3'>
					<Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
						All tasks completed! 🤞
					</Text>
					<img src='/go.png' alt='Go logo' width={70} height={70} />
				</Stack>
			)}
			<Stack gap={3}>
				{todos?.map((todo) => (
					<TodoItem key={todo._id} todo={todo} />
				))}
			</Stack>
		</>
	);
};
export default TodoList;