import React, { Component } from "react";
import { MDBInput, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow} from "mdbreact";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";
import banner4 from "../images/banner4.jpg";
import doc_app from "../images/doc_app.jpg";
import $ from "jquery";
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import next_arrow from "../images/next_arrow.png";
import prev_arrow from "../images/previous_arrow.png";

class HomePage extends Component {
  constructor(props){
    super(props);
    this.slickdiv = React.createRef();
  }
  componentDidMount(){
    $('.dealsMaindiv').slick({
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow:`<img src=${next_arrow} width="100%" class="slick-next"/>`,
      prevArrow:`<img src=${prev_arrow} width="100%" class="slick-prev"/>`,
      touchMove: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  }
    render() {
        return (
          <div className="container">
            <div className="col-12">
                <div className="row col-12 inputBox">
                    {/* <div className="col-4 locationInput">
                        <MDBInput label="Enter Your Location" outline size="sm" icon="map-marker-alt" />
                    </div> */}
                </div>
                <div className="caurosal">
                    <MDBCarousel
                    activeItem={1}
                    length={4}
                    showControls={true}
                    showIndicators={true}
                    className="z-depth-1"
                    >
                    <MDBCarouselInner>
                    <MDBCarouselItem itemId="1">
                    <MDBView>
                    <img
                    className="d-block w-100"
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(6).jpg"
                    alt="First slide"
                    height="300"
                    />
                    <MDBMask overlay="black-light" />
                    </MDBView>
                    <MDBCarouselCaption>
                    <h3 className="h3-responsive">Light mask</h3>
                    <p>First text</p>
                    </MDBCarouselCaption>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="2">
                    <MDBView>
                    <img
                    className="d-block w-100"
                    src={banner2}
                    alt="Second slide"
                    height="300"
                    />
                    <MDBMask overlay="black-strong" />
                    </MDBView>
                    <MDBCarouselCaption>
                    <h3 className="h3-responsive">Strong mask</h3>
                    <p>Second text</p>
                    </MDBCarouselCaption>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="3">
                    <MDBView>
                    <img
                    className="d-block w-100"
                    src={banner3}
                    alt="Third slide"
                    height="300"
                    />
                    <MDBMask overlay="black-slight" />
                    </MDBView>
                    <MDBCarouselCaption>
                    <h3 className="h3-responsive">Slight Mast</h3>
                    <p>Third text</p>
                    </MDBCarouselCaption>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="4">
                    <MDBView>
                    <img
                    className="d-block w-100"
                    src={banner4}
                    alt="last slide"
                    height="300"
                    />
                    <MDBMask overlay="black-light" />
                    </MDBView>
                    <MDBCarouselCaption>
                    <h3 className="h3-responsive">Some Text</h3>
                    <p>Some para</p>
                    </MDBCarouselCaption>
                    </MDBCarouselItem>
                    </MDBCarouselInner>
                    </MDBCarousel>
                </div>
                <div className="dealsContainer">
                    <div className="dealscaurosal">Best Deals and Offers</div>
                    <div className="dealsMaindiv" ref={this.slickdiv}>
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                    </div>
                </div>
                <div className="dealsContainer">
                    <div className="dealscaurosal">Doctors in Top Specialists --- Changing</div>
                    <div className="dealsMaindiv">
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                      <div className="dealsImageView">
                        <MDBNavLink to="/">
                          <div>
                            <img src="https://picsum.photos/240/200/?image=0&random" width="100%" alt="First slide"/>  
                          </div>
                          <div className="dealsImageText">
                            This is text about image one.and the text continues.
                          </div>
                        </MDBNavLink>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        )
    }
}

export default HomePage;