import React from 'react';
import './Landing.css';

const Landing = () => (
  <section className="landing">
    <h1 className="hero-title">Turn the music up!</h1>

    <section className="selling-points">
      <div className="point1">
        <h2 className="point-title1">Choose your music</h2>
        <p className="point-description1">The world is full of music;<br /> why should you have to listen to music someone else chose?</p>
      </div>
      <img className="img1" src={require("./StylingImages/nischal-masand-496010-unsplash.jpg")} alt="Image of man holding a record player" />
      <div className="point2">
        <h2 className="point-title2">Unlimited, streaming, ad-free</h2>
        <p className="point-description2">No arbitrary limits. No distractions.</p>
      </div>
      <img className="img2" src={require("./StylingImages/william-white-37151-unsplash.jpg")} alt="The word FREE" />
      <div className="point3">
        <h2 className="point-title3">Mobile enabled</h2>
        <p className="point-description3">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </div>
      <img className="img3" src={require("./StylingImages/juan-pablo-rodriguez-693578-unsplash.jpg")} alt="A woman wearing headphones at the gym" />
    </section>
  </section>
);

export default Landing;
