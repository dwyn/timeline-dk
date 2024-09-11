import axios from 'axios'; // Importing axios for making HTTP requests
import React, { useEffect, useState } from 'react'; // Importing necessary hooks from React
import { Chrono } from 'react-chrono'; // Importing the Chrono component to display a timeline

/**
 * @typedef {Object} MediaItem
 * @property {string} name - The name of the media item.
 * @property {Object} source - The source object containing the URL of the media.
 * @property {string} source.url - The URL pointing to the media location.
 * @property {string} type - The MIME type of the media (e.g., "image/jpeg").
 */

/**
 * @typedef {Object} EpochItem
 * @property {string} title - Title of the epoch event.
 * @property {string} cardTitle - The main title displayed on the card in the timeline.
 * @property {string} cardSubtitle - A subtitle providing additional context for the epoch.
 * @property {string} cardDetailedText - Detailed description text for the epoch.
 * @property {string} createdAt - Timestamp of when the epoch was created in the backend.
 * @property {string} updatedAt - Timestamp of the last update of the epoch.
 * @property {string} publishedAt - Timestamp of when the epoch was published.
 * @property {MediaItem | null} [media] - Optional media property that describes an image or video attached to the epoch.
 */

/**
 * TimelinePage component to display a timeline of epochs fetched from a Strapi backend.
 * @returns {JSX.Element} The rendered timeline page component.
 */
const TimelinePage: React.FC = () => {
  /** 
   * State to store the fetched epochs data. 
   * @type {[EpochItem[], React.Dispatch<React.SetStateAction<EpochItem[]>>]}
   */
  const [epochs, setEpochs] = useState<EpochItem[]>([]); // Initialize state for epochs

  /**
   * useEffect hook to fetch data from the Strapi backend when the component mounts.
   * The effect runs only once due to the empty dependency array.
   */
  useEffect(() => {
    /**
     * Fetch epochs from the backend.
     * Uses Axios to make an HTTP GET request to the Strapi backend.
     * The response data is then transformed to match the format required by the Chrono component.
     */
    const fetchEpochs = async () => {
      try {
        // Send a GET request to the backend API to fetch epochs
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/epochs?populate=*`, // Construct the URL using an environment variable
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`, // Include an authorization token from environment variables
            },
          }
        );

        console.log('API Response:', response.data); // Log the response data for debugging

        // Check if the response contains the expected 'data' property
        if (response.data && response.data.data) {
          /**
           * Transform the response data to match the format required by the Chrono component.
           * @type {EpochItem[]}
           */
          const fetchedEpochs = response.data.data
            .map((epoch: any) => {
              // If an epoch entry is invalid, log a warning and skip it
              if (!epoch) {
                console.warn('Invalid epoch data:', epoch);
                return null; // Return null to filter out later
              }

              // Extract the first media item from the 'media' array, if it exists
              const mediaItem = epoch.media && epoch.media[0] ? epoch.media[0] : null;

              // Return an object formatted according to the Chrono component's requirements
              return {
                title: epoch.title || 'No Title', // Provide a fallback if the title is missing
                cardTitle: epoch.cardTitle || 'No Card Title', // Provide a fallback if the card title is missing
                cardSubtitle: epoch.cardSubtitle || 'No Subtitle', // Provide a fallback if the subtitle is missing
                cardDetailedText: epoch.cardDetailedText || 'No Detailed Text', // Provide a fallback if the detailed text is missing
                createdAt: epoch.createdAt, // Use createdAt field directly from response
                updatedAt: epoch.updatedAt, // Use updatedAt field directly from response
                publishedAt: epoch.publishedAt, // Use publishedAt field directly from response
                media: mediaItem
                  ? {
                      name: mediaItem.name, // Use the name from the media item
                      source: {
                        url: mediaItem.url, // Use the URL from the media item
                      },
                      type: mediaItem.mime, // Use the MIME type from the media item
                    }
                  : null, // Set media as null if it does not exist
              };
            })
            .filter(Boolean); // Filter out any null items

          // Update the state with the transformed data
          setEpochs(fetchedEpochs);
        } else {
          // Log an error if the API response is not as expected
          console.error('Unexpected API response format:', response);
        }
      } catch (error: any) {
        // Enhanced error handling to log detailed information for Axios errors
        if (axios.isAxiosError(error)) {
          console.error('Error fetching epochs:', error.message); // General error message
          if (error.response) {
            // If there is a server response, log the data, status, and headers
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          } else if (error.request) {
            // If no response is received from the server, log the request
            console.error('No response received:', error.request);
          } else {
            // Any other error setting up the request
            console.error('Error setting up request:', error.message);
          }
        } else {
          // Log any non-Axios related errors
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchEpochs(); // Invoke the fetch function to retrieve the epochs
  }, []); // The empty dependency array ensures this runs only once on component mount

  // Calculate the height based on the number of epochs, assuming each card takes 500px height
  const calculatedHeight = epochs.length * 500; // Adjust the multiplier as needed

  return (
    <div
      style={{
        width: '1440px', // Set a fixed width for the timeline container
        height: `${calculatedHeight}px`, // Dynamically set height based on the number of epochs
      }}
    >
      {/* Render the Chrono timeline component */}
      {epochs.length === 0 ? ( // Render a fallback message if no epochs are available
        <div>No data available</div>
      ) : (
        <Chrono
          items={epochs} // Use the state for Chrono items
          mode="VERTICAL_ALTERNATING" // Use the vertical alternating mode for the timeline
          scrollable={{ scrollbar: true }} // Enable scrollable mode with a scrollbar
          theme={{
            cardBgColor: '#FADAC1', // Background color for the timeline cards
            titleColor: '#00001C', // Color for the card titles
            titleColorActive: '#C43B39', // Color for the active card title
          }}
        />
      )}
    </div>
  );
};

export default TimelinePage; // Export the TimelinePage component as the default export
