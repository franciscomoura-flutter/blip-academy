import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA_B4V3E_h2VFGaESqBLIW2vzIQ2KYm5Bc",
    authDomain: "blip-academy.firebaseapp.com",
    projectId: "blip-academy",
    storageBucket: "blip-academy.firebasestorage.app",
    messagingSenderId: "821433951137",
    appId: "1:821433951137:web:73f9dc972e02f06604e1e0",
    measurementId: "G-JXFNC2M0CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define sidebar section order
const sidebarSectionOrder = ['Start', 'Learn', 'Access', 'Feedback'];

// Function to get all sections
export async function getAllSections() {
    try {
        const sectionsRef = collection(db, 'Sections');
        const querySnapshot = await getDocs(sectionsRef);

        const sections = [];
        querySnapshot.forEach((doc) => {
            sections.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return sections;
    } catch (error) {
        console.error('Error getting sections:', error);
        throw error;
    }
}

// Function to get sections for cards (where card = true) ordered by cardOrder
export async function getCardSections() {
    try {
        const sectionsRef = collection(db, 'Sections');
        const q = query(sectionsRef, where('card', '==', true));
        const querySnapshot = await getDocs(q);

        const sections = [];
        querySnapshot.forEach((doc) => {
            sections.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Sort by cardOrder (ascending), fallback to name if cardOrder is missing
        return sections.sort((a, b) => {
            const orderA = a.cardOrder || 999;
            const orderB = b.cardOrder || 999;

            if (orderA !== orderB) {
                return orderA - orderB;
            }

            // If cardOrder is the same, sort by name
            return (a.name || '').localeCompare(b.name || '');
        });
    } catch (error) {
        console.error('Error getting card sections:', error);
        throw error;
    }
}

// Function to get sections grouped by sidebar section with custom ordering
export async function getSidebarSections() {
    try {
        const sections = await getAllSections();

        const sidebarSections = {};

        // Group sections by sidebarSection
        sections.forEach(section => {
            if (!sidebarSections[section.sidebarSection]) {
                sidebarSections[section.sidebarSection] = {};
            }
            sidebarSections[section.sidebarSection][section.name] = {
                url: section.url,
                external: section.external,
                icon: section.sidebarIcon
            };
        });

        // Create ordered result based on predefined section order
        const orderedSidebarSections = {};

        sidebarSectionOrder.forEach(sectionName => {
            if (sidebarSections[sectionName]) {
                orderedSidebarSections[sectionName] = sidebarSections[sectionName];
            }
        });

        // Add any sections that weren't in the predefined order (as fallback)
        Object.keys(sidebarSections).forEach(sectionName => {
            if (!orderedSidebarSections[sectionName]) {
                orderedSidebarSections[sectionName] = sidebarSections[sectionName];
            }
        });

        return orderedSidebarSections;
    } catch (error) {
        console.error('Error getting sidebar sections:', error);
        throw error;
    }
}

// Function to get tools partnerships
export async function getToolsPartnerships() {
    try {
        const toolsRef = collection(db, 'ToolsPartnerships');
        const querySnapshot = await getDocs(toolsRef);

        const tools = [];
        querySnapshot.forEach((doc) => {
            tools.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Sort by name alphabetically
        return tools.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } catch (error) {
        console.error('Error getting tools partnerships:', error);
        throw error;
    }
}