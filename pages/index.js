import { useContext, useEffect, useState } from "react";
import ParallaxBG from "../components/cards/ParallaxBG";
import { UserContext } from "../context";
import axios from "axios";
import Post from "../components/cards/Post";
import Post_HomePage from "../components/cards/Post_HomePage";
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection : true,
});



const Home = ({posts}) => {
  const [state, setState] = useContext(UserContext);

  const [newsFeed, setNewsFeed] = useState([]);

  // useEffect(() => {
  //   //console.log("SOCKET ON JOIN", socket);
  //   socket.on("receive-message", (newMessage) => {
  //     alert(newMessage);
  //   });
  // }, []);

  useEffect(() => {
    //console.log("SOCKET ON JOIN", socket);
    socket.on("new-post", (newPost) => {
      setNewsFeed([newPost, ...posts]);
    });
  }, []);

  const head = () => (
    <Head>
      <title>FAREWELL - a social network by devs for devs</title>
      <meta
        name="description"
        content="A social network by developers for developers"
      />
      <meta
        property="og:description"
        content="A social network by developers for developers"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="FAREWELL" />
      <meta property="og:url" content="http://meaningofcode.com" />
      <meta
        property="og:image:source_url"
        content="http://meaningofcode.com/images/default.jpg"
      />
    </Head>
  );

  const collection = newsFeed.length > 0 ? newsFeed : posts ;

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />
      {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}

      <div className="container">
        {/* <button onClick={() => {
        socket.emit("send-message", "THis is ryan!!!");
      }}
      >
      Send Message
      </button> */}
        <div className="row pt-5">
          {collection.map((post) => (
            <div className="col-md-4">
              <Link href={`/post/${post._id}`}>
                <a>
                  {" "}
                  <Post_HomePage key={post._id} post={post} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export async function getServerSideProps() {
  const { data } = await axios.get(
    "https://mernsocialapp-udemy.herokuapp.com/posts"
  );
  //console.log(data);
  return {
    props: {
      posts: data
  }
}
}

export default Home;
