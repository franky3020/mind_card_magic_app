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

    if (cradId === "null") {
        return "inset(10px 6px round 10px)";
    }
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
