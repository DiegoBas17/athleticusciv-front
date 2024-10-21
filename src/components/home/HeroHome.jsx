import { Carousel } from "react-bootstrap";

const HeroHome = () => {
  return (
    <Carousel controls={false} fade>
      <Carousel.Item interval={5000}>
        <img
          src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="foto-hero"
          style={{
            width: "100%",
            height: "40vh",
            objectFit: "cover",
            objectPosition: "15% 100%",
          }}
          className="rounded-4"
        />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          src="https://images.unsplash.com/photo-1518905332052-b6cfda20ee45?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="foto-hero"
          style={{
            width: "100%",
            height: "40vh",
            objectFit: "cover",
            objectPosition: "0% 20%",
          }}
          className="rounded-4"
        />
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          src="https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="foto-hero"
          style={{
            width: "100%",
            height: "40vh",
            objectFit: "cover",
            objectPosition: "0% 70%",
          }}
          className="rounded-4"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroHome;
