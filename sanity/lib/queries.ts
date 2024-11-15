import {client} from "./client";
import groq from "groq";

export const getServiceCarouselData = async () => {
    const query = `*[_type == "serviceCarousel"]{
        title,
        serviceLink,
        requestLink,
        category,
        description,
        "mainImageUrl": mainImage.asset->url
    }`;
    return await client.fetch(query);
};

export const fetchHomeGalleryData = async () => {
    try {
        const query = `*[_type == "homeGallery"]{
            _id,
            title,
            "slug": slug.current,
            "imageUrl": image.asset->url
        }`;
        return await client.fetch(query);
    } catch (error) {
        console.error('Error fetching gallery data:', error);
        return [];
    }
};

export const fetchHomeGalleryOneData = async () => {
    try {
        const query = `*[_type == "homeGalleryOne"]{
            _id,
            title,
            "slug": slug.current,
            "imageUrl": image.asset->url
        }`;
        return await client.fetch(query);
    } catch (error) {
        console.error('Error fetching gallery data:', error);
        return [];
    }
};

export const getAboutUsHomeData = async () => {
    const query = `*[_type == "aboutUsHome"]{
        content
    }[0]`;
    return await client.fetch(query);
};

export const getHomeVideoData = async () => {
    const query = `*[_type == "homeVideo"]{
  videoLabel,
  "videoUrl": url.asset->url
}`
    return await client.fetch(query);
}

export const fetchProjects = async () => {
    const query = `*[_type == "projectPage"]{
        _id,
        title,
        category,
        "imageUrl": image.asset->url,
        "slug": slug.current
    }`;
    return await client.fetch(query);
};

export const projectQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    slug,
    "backgroundVideo": backgroundVideo.asset->url,
    content,
    "mainImage": mainImage.asset->url,
    listSections,
    extraContent,
    "extraImage": extraImage.asset->url,
    "fullWidthImage": fullWidthImage.asset->url,
    centeredText,
    "images": images[].asset->url,
    "carouselImages": carouselImages[].asset->url
  }
`;
