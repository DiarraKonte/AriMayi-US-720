import { NotificationContext } from "../../arimayi-app/src/app/[locale]/Provider/NotificationProvider"; // Importation réelle
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMockStore } from "./createMockStore";

// Ne pas mocker NotificationContext ici, car renderWithProviders le gère
// jest.mock(...); // Supprimez cette ligne

// Mock notification object
export const mockNotification = {
  success: jest.fn(),
  error: jest.fn(),
};

// Render utility
export const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={createMockStore()}>
      <NotificationContext.Provider value={mockNotification}>
        {component}
      </NotificationContext.Provider>
    </Provider>
  );
};