import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authConfig: AuthOptions = {
    pages: {
        signIn: "/login",
        signOut: "/",
    },
    providers: [
        Credentials({
            credentials: {
                phone: { label: "Phone", type: "text" },
                password: { label: "Password", type: "text" },
            },

            async authorize(credentials, req) {
                try {
                    const userType: "staff" | "customer" = req?.body?.userType;
                    if (
                        !credentials?.phone ||
                        !credentials?.password ||
                        !userType
                    ) {
                        throw new Error("Enter all Credentials");
                    }

                    if (userType === "customer") {
                        const customer = await prisma?.customer?.findUnique({
                            where: {
                                phone: credentials?.phone,
                            },
                        });

                        if (!customer) {
                            throw new Error("User not found!!");
                        }

                        const isPasswordValid = await bcrypt.compare(
                            credentials?.password,
                            customer?.password,
                        );

                        if (!isPasswordValid) {
                            throw new Error("Invalid Creadentials!!");
                        }

                        return {
                            userType,
                            customer: {
                                email: customer?.email,
                                name: customer?.name,
                                business_name: customer?.business_name,
                                phone: customer?.phone,
                                isBanned: customer?.is_Banned,
                                id: customer?.id,
                                customer_category: customer?.customer_category,
                            },
                        };
                    } else if (userType === "staff") {
                        const staff = await prisma?.staff?.findUnique({
                            where: {
                                phone: credentials?.phone,
                            },
                        });

                        if (!staff) {
                            throw new Error("staff not found!!");
                        }

                        const isPasswordValid = await bcrypt.compare(
                            credentials?.password,
                            staff?.password,
                        );

                        if (!isPasswordValid) {
                            throw new Error("Invalid Creadentials!!");
                        }

                        return {
                            userType,
                            staff: {
                                id: staff?.id,
                                name: staff?.name,
                                phone: staff?.phone,
                                email: staff?.email,
                                role: staff?.role,
                            },
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error in credentials", error);
                    throw new Error(error as string);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // token.role = user.role;
                token.id = Number(user.id);
            }
            return token;
        },

        // redirect: async ({ url, baseUrl }) => {
        //   // Handle redirects based on user role
        //   const user = await getServerSession(authConfig); // Get user from session

        //   if (user && user?.user.role === "admin") {
        //     return `${baseUrl}/admin`;
        //   } else if (user && user?.user.role === "staff") {
        //     return `${baseUrl}/staff`;
        //   } else if (user && user.user.role === "customer") {
        //     return `${baseUrl}/customer`;
        //   }
        //   return baseUrl; // Default redirect
        // },

        async session({ session, token }) {
            if (token) {
                if (token?.customer?.id) {
                    session.user.customer.id = token.customer.id;
                }
                if (token?.staff?.id) {
                    session.user.staff.id = token.staff.id;
                }
            }
            return session;
        },

        // authorized({ auth, request: { nextUrl } }) {
        //   const isLoggedIn = !!auth?.user;
        //   const isAdmin = auth?.user?.role === "ADMIN";
        //   const isAdminPanel = nextUrl.pathname.startsWith("/admin");

        //   if (isAdminPanel && !isAdmin) {
        //     return false;
        //   }

        //   return true;
        // },
    },
};
