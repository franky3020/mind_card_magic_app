import skCard from "../assets/cards/sk_compressed.jpg";
import hkCard from "../assets/cards/hk_compressed.jpg";
import dkCard from "../assets/cards/dk_compressed.jpg";
import ckCard from "../assets/cards/ck_compressed.jpg";

import sqCard from "../assets/cards/sq_compressed.jpg";
import hqCard from "../assets/cards/hq_compressed.jpg";
import dqCard from "../assets/cards/dq_compressed.jpg";
import cqCard from "../assets/cards/cq_compressed.jpg";

import sjCard from "../assets/cards/sj_compressed.jpg";
import hjCard from "../assets/cards/hj_compressed.jpg";
import djCard from "../assets/cards/dj_compressed.jpg";
import cjCard from "../assets/cards/cj_compressed.jpg";

export function getPokerCardClipPath(cradId) {

    let result = "";
    switch(cradId) {
        
        case "foldCard":
            result = "inset(2% 2% 2% 2% round 5%)"
            break;
        case "ckCard":
            result = "inset(4% 3.5% 4% 4% round 5%)"
            break;
        case "sjCard":
            result = "inset(3% 2% 4% 2% round 5%)"
            break;
        case "djCard":
            result = "inset(4% 2% 4% 2% round 5%)"
            break; 
        case "hjCard":
            result = "inset(3% 2% 3% 3% round 5%)"
            break;
        case "cjCard":
            result = "inset(3% 2% 3% 1% round 5%)"
            break;    
        case "skCard":
            result = "inset(2% 2% 2% 2% round 5%)"
            break;
        case "dkCard":
            result = "inset(2% 2% 3% 2% round 5%)"
            break;        
        case "cqCard":
            result = "inset(2% 2% 3% 2% round 5%)"
            break;
        case "hqCard":
            result = "inset(2% 2% 3% 2% round 5%)"
            break;
        default:
            result = "inset(4% 3% 4% 4% round 5%)";
    }

    return result
}


export const skCardInfo = {
    "img": skCard,
    "cardId": "skCard"
}

export const hkCardInfo = {
    "img": hkCard,
    "cardId": "hkCard"
}

export const dkCardInfo = {
    "img": dkCard,
    "cardId": "dkCard"
}

export const ckCardInfo = {
    "img": ckCard,
    "cardId": "ckCard"
}

export const sqCardInfo = {
    "img": sqCard,
    "cardId": "sqCard"
}

export const hqCardInfo = {
    "img": hqCard,
    "cardId": "hqCard"
}

export const dqCardInfo = {
    "img": dqCard,
    "cardId": "dqCard"
}

export const cqCardInfo = {
    "img": cqCard,
    "cardId": "cqCard"
}

export const sjCardInfo = {
    "img": sjCard,
    "cardId": "sjCard"
}

export const hjCardInfo = {
    "img": hjCard,
    "cardId": "hjCard"
}

export const djCardInfo = {
    "img": djCard,
    "cardId": "djCard"
}

export const cjCardInfo = {
    "img": cjCard,
    "cardId": "cjCard"
}
