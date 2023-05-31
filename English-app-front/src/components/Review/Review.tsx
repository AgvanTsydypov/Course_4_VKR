import React, {useState} from "react";
import people from "../../data/review";
import {FaChevronLeft, FaChevronRight, FaQuoteRight} from "react-icons/fa";
import {Button} from "../../common/Button";
import {Row} from "antd";
import {reviewProps} from "../../common/types";

const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const Review = ({idForSearch}: reviewProps) => {
    const [index, setIndex] = useState(getRandomIntInclusive(0, people.length - 1));
    const {id, name, job, image, text} = people[index];

    const checkNumber = (number: number) => {
        if (number > people.length - 1) {
            return 0;
        }
        if (number < 0) {
            return people.length - 1;
        }
        return number;
    };

    const nextPerson = () => {
        setIndex((index) => {
            let newIndex = index + 1;
            return checkNumber(newIndex);
        });
    };

    const prevPerson = () => {
        setIndex((index) => {
            let newIndex = index - 1;
            return checkNumber(newIndex);
        });
    };
    const minIndex = 0;


    const maxIndex = people.length - 1;

    const getRandomPerson = () => {

        let randomIndex = getRandomIntInclusive(minIndex, maxIndex);
        if (randomIndex === index) {
            randomIndex = index + 1
        }
        setIndex(checkNumber(randomIndex));

    }


    return (
        <Row justify="center" align="middle">
            <article className="review" id={idForSearch}>
                {/* <div className="img-container">
                        <img src={image} alt={name} className="person-img"/>
                        <span className="quote-icon">
          <FaQuoteRight/>
        </span>
                    </div> */}
                {/* <h4 className="author">{name}</h4>
                    <p className="job">{job}</p>
                    <p className="info">{text}</p> */}
                {/*<div className="button-container">*/}
                {/*    <Button onClick={prevPerson}>*/}
                {/*        <FaChevronLeft/>*/}
                {/*    </Button>*/}
                {/*    <Button onClick={nextPerson}>*/}
                {/*        <FaChevronRight/>*/}
                {/*    </Button>*/}
                {/*</div>*/}
                {/* <Button onClick={getRandomPerson}>Случайный отзыв</Button> */}
            </article>
        </Row>
    );
};

export default Review;
