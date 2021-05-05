import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/src/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  width: 100%;
  height: 300vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const TextContainer = styled.div`
  position: fixed;
`;

const Main = () => {
  const [velocity, setVelocity] = useState(0);
  const ref = useRef(null);
  const mainRef = useRef(null);
  const animation = () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        onUpdate: (self) => {
          setVelocity(self.getVelocity());
        },
      },
    });
  };

  const textAnimation = () => {
    const tl = gsap.timeline();
    tl.to(ref.current.firstChild, {
      skewX: -1 * (velocity * 0.01),
    });
  };

  //set Velocity to 0 right after every time self.getVelocity() updates our velocity

  useEffect(() => {
    setVelocity(0);
    textAnimation();
  }, [velocity]);

  useEffect(() => {
    animation();
  }, []);

  return (
    <>
      <div ref={mainRef}>
        <TextContainer ref={ref}>
          <h1 id='main'>
            {" "}
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </h1>
          <h1>{velocity}</h1>
        </TextContainer>
        <Container></Container>
      </div>
    </>
  );
};

export default Main;
