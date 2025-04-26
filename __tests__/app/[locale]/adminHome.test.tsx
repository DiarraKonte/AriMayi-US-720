import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminHome from "@/app/components/adminHome"

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock theme token
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  theme: {
    useToken: () => ({
      token: {
        colorWhite: '#ffffff'
      }
    })
  }
}));

describe('AdminHome', () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
  });
  beforeEach(() => {
    render(<AdminHome />);
  });

  it('renders greeting title', () => {
    expect(screen.getByText('Bonjour Prénom Nom')).toBeInTheDocument();
  });

  it('renders all counter list items', () => {
    const listItems = ['Disponibles :', 'Réservés :', 'En attente :', 'TOTAL :'];
    const instances = 4;

    listItems.forEach(item => {
      const elements = screen.getAllByText(item);
      expect(elements).toHaveLength(instances);
    });
  });

  it('renders project table link correctly', () => {
    const link = screen.getByRole('link', { name: /Tableau projets/i });
    expect(link).toHaveAttribute('href', '/portal/admin/project/projects-list');
  });
});