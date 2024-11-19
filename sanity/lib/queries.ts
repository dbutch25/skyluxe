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
    "fallbackImage": fallbackImage.asset->url,
    content,
    "mainImage": mainImage.asset->url,
    listSections,
    extraContent,
    "extraImage": extraImage.asset->url,
    "fullWidthImage": fullWidthImage.asset->url,
    centeredText,
    "images": images[].asset->url,
    "carouselImages": carouselImages[].asset->url,
    firstEmbed,
    secondEmbed,
    thirdEmbed
  }
`;

export const getRepairsPage = groq`
  *[_type == "repairs"]{
    title,
    firstContent,
    secondContent,
    "firstImage": {
      "url": firstImage.image.asset->url,
      "alt": firstImage.alt
    },
    thirdContent,
    "images": images[]{
      "url": image.asset->url,
      "alt": alt
    },
    listSections[]{
      items
    }
  }
`;

export const getWaterproofingPage = groq`
  *[_type == "waterproofing"][0] {
    title,
    description,
    accordionItems[] {
      accordionTitle,
      accordionContent
    },
    gallery[] {
      "url": galleryImage.asset->url,
      galleryAlt
    },
    manufacturersGallery[] {
      "url": manufacturerImage.asset->url,
      manufacturerAlt
    }
  }
`;

export const getCladdingPage = groq`
  *[_type == "cladding"][0] {
    title,
    content,
    extraTitle,
    extraContent,
    listSections[] {
      items
    },
    galleryImages[] {
      "url": image.asset->url,
      alt
    },
    carouselMImages[] {
      "url": image.asset->url,
      alt
    },
    carouselADImages[] {
      "url": image.asset->url,
      alt
    }
  }
`;

export const getICIRoofingPage = groq`
  *[_type == "iciRoofing"][0] {
    title,
    content,
    firstTitle,
    firstContent,
    firstImage {
      "url": image.asset->url,
      alt
    },
    secondImage {
      "url": image.asset->url,
      alt
    },
    secondContent,
    thirdContent,
    secondTitle,
    listSections[] {
      items
    },
    listItem,
    galleryImages[] {
      "url": image.asset->url,
       alt
    },
    extraTitle,
    carouselMImages[] {
        "url": image.asset->url,
        alt
    }
  }
`;

export const fetchResidentialData = groq`
   *[_type == "residential"][0]{
    title,
    backgroundImage{
      image{
        asset->{
          _id,
          url
        },
      },
      alt
    },
    residentialList[] {
      items
    },
    firstTitle,
    firstContent,
    firstImage{
      image{
        asset->{
          _id,
          url
        },
      },
      alt
    },
    secondImage{
      image{
        asset->{
          _id,
          url
        },
      },
      alt
    },
    "residentialImages": residentialImages[].asset->url,
    asphaltTitle,
    asphaltFirstContent,
    asphaltImage{
      image{
        asset->{
          _id,
          url
        },
      },
      alt
    },
    "asphaltImages": asphaltImages[].asset->url,
    cedarTitle,
    cedarFirstContent,
    cedarFirstImage{
      image{
        asset->{
          _id,
          url
        },
      },
      alt
    },
    cedarSecondImage{
      image{
        asset->{
          _id,
          url
        },
      },
      alt
    },
    "cedarImages": cedarImages[].asset->url,
    metalsTitle,
    metalsList[]->{
      items
    },
    metalsContent,
    metalsFirstImage{
      image{
        asset->{
          _id,
          url
        },
      },
      alt
    },
    "metalsImages": metalsImages[].asset->url,
    guttersTitle,
    guttersContent,
    guttersFirstImage{
      image{
        asset->{
          _id,
          url
        },
      },
      alt
    },
    guttersSecondImage{
      image{
        asset->{
          _id,
          url
        },
      },
      alt
    },
    "guttersImages": guttersImages[].asset->url,
    naturalTitle,
    naturalContent,
    "naturalImages": naturalImages[].asset->url,
    syntheticTitle,
    syntheticContent,
    syntheticImage{
      image{
        asset->{
          _id,
          url
        },
      },
      alt
    },
    "syntheticImages": syntheticImages[].asset->url,
    skylightTitle,
    skylightContent,
    carouselMImages[] {
        "url": image.asset->url,
        alt
    }
  }`;







