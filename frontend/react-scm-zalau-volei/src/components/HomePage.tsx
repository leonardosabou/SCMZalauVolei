import {Countdown} from "./HomePage/Countdown";
import {News} from "./HomePage/News";
import {Results} from "./HomePage/Results";
import {Sponsors} from "./HomePage/Sponsors";
import { PlayerCarousel } from "./HomePage/PlayerCarousel";

export const HomePage = () => {
    return (
        <>
        <Countdown />
        <PlayerCarousel />
        <News />
        <Results />
        <Sponsors />
        </>
    )
}