import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { Post } from "../components/Post.jsx";
import { useRecoilState, useRecoilValue } from "recoil";
import { postsAtom } from "../atoms/feedPostsAtom.js";
import { SuggestedUsers } from "../components/SuggestedUsers.jsx";
import { useShowToast } from "../../hooks/useShowToast.js";
import { loggedInUserAtom } from "../atoms/loggedInUserAtom.js";

export const HomePage = () => {
  const loggedInUser = useRecoilValue(loggedInUserAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  useEffect(() => {
    const getFeedPosts = async () => {
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        // console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);

  return (
    <Flex
      justifyContent={"center"}
      w={"full"}
      alignItems="center"
      minHeight="100vh"
    >
      <Box w={"40%"} alignItems="center" mt="2%">
        <Box>
          {loading && (
            <Flex justifyContent="center" alignItems="center">
              <Spinner size="xl"></Spinner>
            </Flex>
          )}

          {!loading && posts.length === 0 && (
            <Flex justifyContent={"center"} alignItems="center">
              <Text fontSize="2xl">"Follow some users to see the feed"</Text>
            </Flex>
          )}

          {!loading &&
            posts.length !== 0 &&
            posts.map((post, index) => (
              <Box key={post._id}>
                <Post post={post} postedBy={post.postedBy}></Post>
                {index !== posts.length - 1 && (
                  <Box
                    border="1px solid"
                    mt="2%"
                    borderRadius={10}
                    borderColor="gray.600"
                  ></Box>
                )}
              </Box>
            ))}
        </Box>
      </Box>
    </Flex>
  );
};

// import { Box, Flex, Spinner } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";

// import { Post } from "../components/Post.jsx";
// import { useRecoilState } from "recoil";
// import { postsAtom } from "../atoms/postsAtom.js";
// import { SuggestedUsers } from "../components/SuggestedUsers.jsx";
// import { useShowToast } from "../../hooks/useShowToast.js";

// export const HomePage = () => {
//   const [posts, setPosts] = useRecoilState(postsAtom);
//   const [loading, setLoading] = useState(true);
//   const showToast = useShowToast();
//   useEffect(() => {
//     const getFeedPosts = async () => {
//       setPosts([]);
//       try {
//         const res = await fetch("/api/posts/feed");
//         const data = await res.json();
//         // console.log(data);
//         if (data.error) {
//           showToast("Error", data.error, "error");
//           return;
//         }
//         setPosts(data);
//       } catch (error) {
//         showToast("Error", error, "error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     getFeedPosts();
//   }, [showToast, setPosts]);

//   return (
//     <Flex
//       w="full"
//       justifyContent="center" // Center horizontally
//     >
//       <Box w={"70%"} alignItems="center">
//         <Flex gap={10}>
//           <Box flex={70}>
//             {loading && (
//               <Flex justify="center">
//                 <Spinner size="xl"></Spinner>
//               </Flex>
//             )}
//             {!loading && posts.length === 0 && (
//               <Flex justifyContent={"center"} mt="250px">
//                 <h1 style={{ fontSize: "20px" }}>
//                   "Follow some users to see the feed"
//                 </h1>
//               </Flex>
//             )}

//             {posts.length !== 0 &&
//               posts.map((post) => (
//                 <Post
//                   key={post._id}
//                   post={post}
//                   postedBy={post.postedBy}
//                 ></Post>
//               ))}
//           </Box>
//           <Box
//             flex={30}
//             borderRadius={4}
//             display={{ base: "none", md: "block" }}
//           >
//             <SuggestedUsers />
//           </Box>
//         </Flex>
//       </Box>
//     </Flex>
//   );
// };
