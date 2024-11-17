import { type SchemaTypeDefinition } from 'sanity'

import serviceCarousel from "./schemaTypes/serviceCarousel";
import homeVideo from "./schemaTypes/homeVideo";
import aboutUsHome from "./schemaTypes/aboutUsHome";
import homeGallery from "./schemaTypes/homeGallery";
import projectPage from "./schemaTypes/projectPage";
import sectionContent from "./schemaTypes/sectionContent";
import pageImage from "./schemaTypes/pageImage";
import project from "./schemaTypes/project";
import homeGalleryOne from "./schemaTypes/homeGalleryOne";
import repairs from "./schemaTypes/repairs";
import {waterproofing} from "./schemaTypes/waterproofing";
import cladding from "./schemaTypes/cladding";
import iciRoofing from "./schemaTypes/iciRoofing";
import residential from "./schemaTypes/residential";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [serviceCarousel,homeGalleryOne, homeVideo, aboutUsHome, homeGallery, projectPage, sectionContent, pageImage, project, repairs, waterproofing, cladding, iciRoofing, residential],
}
