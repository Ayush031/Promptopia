import Feed from "@components/Feed";

const Home = () => {
  return (
    <section>
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nihil
        doloremque ab! Quidem aut ab deserunt animi. Unde, eius velit.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
