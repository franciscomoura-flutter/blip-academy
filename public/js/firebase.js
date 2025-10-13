import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

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

// Function to get all sections
export async function getAllSections() {
    try {
        const sectionsRef = collection(db, 'sections');
        const q = query(sectionsRef, orderBy('name'));
        const querySnapshot = await getDocs(q);

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

// Function to get sections for cards (where card = true)
export async function getCardSections() {
    try {
        const sectionsRef = collection(db, 'sections');
        const q = query(sectionsRef, where('card', '==', true), orderBy('name'));
        const querySnapshot = await getDocs(q);

        const sections = [];
        querySnapshot.forEach((doc) => {
            sections.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return sections;
    } catch (error) {
        console.error('Error getting card sections:', error);
        throw error;
    }
}

// Function to get sections grouped by sidebar section
export async function getSidebarSections() {
    try {
        const sections = await getAllSections();

        const sidebarSections = {};
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

        return sidebarSections;
    } catch (error) {
        console.error('Error getting sidebar sections:', error);
        throw error;
    }
}