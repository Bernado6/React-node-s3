import { Box, Image, Text, VStack } from '@chakra-ui/react';
import Posts from './Posts';

const Profile = () => {
  return (
    <Box>
      <VStack p={7} m="auto" width="fit-content" borderRadius={6} bg="gray.700">
        <Image
          borderRadius="full"
          boxSize="80px"
          src="https://avatars.githubusercontent.com/u/107627402?v=4"
          alt="Profile"
        />
        <Text>Bernard Kipngeno</Text>
        <Text fontSize="lg" color="gray.400">
          ML Engineer
        </Text>
      </VStack>

      <Posts />
    </Box>
  );
};
export default Profile;
