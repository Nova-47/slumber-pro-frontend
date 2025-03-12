import { Img } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Img
        src="https://i.ibb.co/1t6ZbLKr/5291a351-b966-461e-a453-1cbd7d12c085-1.jpg"
        alt="Naruto vs Sasuke amazing"
        aspectRatio={4 / 3}
        width="100%"
        height="621px"
        p={[2, 4, 8, 12]}
      />
    </div>
  );
}
