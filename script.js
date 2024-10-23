"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Get form and preview elements
const form = document.getElementById("resumeForm");
const resumePage = document.getElementById("resumePage");
const resumePhoto = document.getElementById("resumePhoto");
const resumeName = document.getElementById("resumeName");
const resumeobject = document.getElementById("resumeobject");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeAddress = document.getElementById("resumeAddress");
const resumeEducation = document.getElementById("resumeEducation");
const resumeWorkExperience = document.getElementById("resumeWorkExperience");
const resumeSkills = document.getElementById("resumeSkills");
const resumeHobbies = document.getElementById("resumeHobbies");
const resumeLanguage = document.getElementById("resumeLanguage");
const resumeLinks = document.getElementById("resumeLinks");
const downloadPdfButton = document.getElementById('download-pdf');
const backButton = document.getElementById("backButton");
const editButton = document.getElementById("editButton");
const resumeContent = document.getElementById("resumeContent");
// Handle form submission
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    // Collect form values
    const name = document.getElementById("name").value;
    const object = document.getElementById("object").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const degree = document.getElementById("degree").value;
    const education = document.getElementById("education").value;
    const workExperience = document.getElementById("workExperience").value;
    const skills = document.getElementById("skills").value;
    const hobbies = document.getElementById("hobbies").value;
    const language = document.getElementById("language").value;
    const links = document.getElementById("links").value;
    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = '';
    if (photoFile) {
        photoBase64 = yield fileToBase64(photoFile);
        // Store the photo in localStorage instead of passing it in the URL
        localStorage.setItem("resumePhoto", photoBase64);
        resumePhoto.src = photoBase64;
    }
    // Populate the resume preview
    resumeName.textContent = name;
    resumeobject.textContent = object;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.textContent = `Phone: ${phone}`;
    resumeAddress.textContent = `Address:${address}`;
    resumeEducation.textContent = `${degree} from ${education}`;
    resumeWorkExperience.textContent = workExperience;
    resumeSkills.textContent = skills;
    resumeHobbies.textContent = hobbies;
    resumeLanguage.textContent = `Language:${language}`;
    resumeLinks.textContent = links;
    // Hide form and show resume page
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    resumePage.classList.remove("hidden");
}));
// Convert photo to Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
// Add back button functionality to go back to the form
backButton.addEventListener("click", () => {
    var _a;
    // Show the form again and hide the resume preview
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
    // Optionally clear query parameters
    window.history.replaceState(null, '', '/');
});
// Add edit button functionality
editButton.addEventListener("click", () => {
    var _a;
    // Populate the form with current resume data for editing
    updateFormFromResume();
    // Show the form again for editing
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
// Function to update the form fields with current resume data
function updateFormFromResume() {
    var _a, _b, _c, _d;
    const [degree, education] = ((_a = resumeEducation.textContent) === null || _a === void 0 ? void 0 : _a.split(" from ")) || [];
    document.getElementById("name").value = resumeName.textContent || '';
    document.getElementById("object").value = resumeobject.textContent || '';
    document.getElementById("email").value = ((_b = resumeEmail.textContent) === null || _b === void 0 ? void 0 : _b.replace('Email: ', '')) || '';
    document.getElementById("phone").value = ((_c = resumePhone.textContent) === null || _c === void 0 ? void 0 : _c.replace('Phone: ', '')) || '';
    document.getElementById("address").value = ((_d = resumeAddress.textContent) === null || _d === void 0 ? void 0 : _d.replace('Address', '')) || '';
    document.getElementById("degree").value = degree || '';
    document.getElementById("education").value = education || '';
    document.getElementById("workExperience").value = resumeWorkExperience.textContent || '';
    document.getElementById("skills").value = resumeSkills.textContent || '';
    document.getElementById("hobbies").value = resumeHobbies.textContent || '';
    document.getElementById("language").value = resumeLanguage.textContent || '';
    document.getElementById("links").value = resumeLinks.textContent || '';
}
// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    if (typeof html2pdf === 'undefined') {
        alert('Error: html2pdf library is not loaded.');
        return;
    }
    const resumeOptions = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Generate and download PDF
    html2pdf()
        .from(resumeContent)
        .set(resumeOptions)
        .save()
        .catch((error) => {
        console.error('PDF generation error:', error);
    });
});
// Handle query parameters on page load
window.addEventListener('DOMContentLoaded', () => {
    var _a;
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const object = params.get('object') || '';
    const email = params.get('email') || '';
    const phone = params.get('phone') || '';
    const address = params.get('address') || '';
    const degree = params.get('degree') || '';
    const education = params.get('education') || '';
    const workExperience = params.get('workExperience') || '';
    const skills = params.get('skills') || '';
    const hobbies = params.get('hobbies') || '';
    const language = params.get('language') || '';
    const links = params.get('links') || '';
    if (name || email || phone || degree || education || workExperience || skills) {
        // Populate the resume preview if query params are present
        resumeName.textContent = name;
        resumeobject.textContent = object;
        resumeEmail.textContent = `Email: ${email}`;
        resumePhone.textContent = `Phone: ${phone}`;
        resumeAddress.textContent = `Address: ${address}`;
        resumeEducation.textContent = `${degree} from ${education}`;
        resumeWorkExperience.textContent = workExperience;
        resumeSkills.textContent = skills;
        resumeHobbies.textContent = hobbies;
        resumeLanguage.textContent = `Language: ${language}`;
        resumeLinks.textContent = links;
        // Retrieve photo from localStorage (if available)
        const savedPhoto = localStorage.getItem("resumePhoto");
        if (savedPhoto) {
            resumePhoto.src = savedPhoto;
        }
        // Hide form and show resume page
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        resumePage.classList.remove("hidden");
    }
});
// CSS for ensuring the image is styled properly
resumePhoto.style.width = "150px"; // Adjust width as per your requirement
resumePhoto.style.height = "150px";
resumePhoto.style.objectFit = "cover";
resumePhoto.style.borderRadius = "50%"; // Circular image
resumePhoto.style.display = "block";
resumePhoto.style.margin = "0 auto";
