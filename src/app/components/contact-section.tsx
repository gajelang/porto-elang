"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Linkedin } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-4xl md:text-3xl font-bold mb-4 mx-16">
            Tell me about your next project
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mx-16">
            Feel free to reach out for collaborations or just a friendly hello.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mb-8"
        >
          <motion.a
            href="mailto:elangsamudra.work@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 bg-card p-4 md:p-6 rounded-lg hover:bg-card/80 transition-colors"
          >
            <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <span className="text-lg md:text-xl font-medium">Email Me</span>
          </motion.a>

          <motion.a
            href="https://wa.me/yourwhatsappnumber"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 bg-card p-4 md:p-6 rounded-lg hover:bg-card/80 transition-colors"
          >
            <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <span className="text-lg md:text-xl font-medium">WhatsApp</span>
          </motion.a>
        </motion.div>

        {/* Ikon Media Sosial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-4 md:gap-6"
        >
          {[
            {
              icon: Linkedin,
              link: "https://www.linkedin.com/in/elangsamudra/",
            },
            {
              icon: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 md:w-6 md:h-6"
                >
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076l.008-.042c.207-1.143.849-3.06 2.839-3.06a2.705 2.705 0 0 1 2.703 2.703a2.707 2.707 0 0 1-2.704 2.702m0-8.14c-2.539 0-4.51 1.649-5.31 4.366c-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112a2.55 2.55 0 0 1-2.547 2.548a2.55 2.55 0 0 1-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303c2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109c3 0 5.439-2.452 5.439-5.45c0-3-2.439-5.439-5.439-5.439" />
                </svg>
              ),
              link: "https://www.upwork.com/freelancers/~010519a636312464f9",
            },
            {
              icon: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  className="w-5 h-5 md:w-6 md:h-6"
                >
                  <path
                    fill="currentColor"
                    d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32M598.5 350.9h138.4v33.7H598.5zM512 628.8a89.5 89.5 0 0 1-27 31c-11.8 8.2-24.9 14.2-38.8 17.7a167.4 167.4 0 0 1-44.6 5.7H236V342.1h161c16.3 0 31.1 1.5 44.6 4.3c13.4 2.8 24.8 7.6 34.4 14.1c9.5 6.5 17 15.2 22.3 26c5.2 10.7 7.9 24.1 7.9 40c0 17.2-3.9 31.4-11.7 42.9c-7.9 11.5-19.3 20.8-34.8 28.1c21.1 6 36.6 16.7 46.8 31.7c10.4 15.2 15.5 33.4 15.5 54.8c0 17.4-3.3 32.3-10 44.8M790.8 576H612.4c0 19.4 6.7 38 16.8 48c10.2 9.9 24.8 14.9 43.9 14.9c13.8 0 25.5-3.5 35.5-10.4c9.9-6.9 15.9-14.2 18.1-21.8h59.8c-9.6 29.7-24.2 50.9-44 63.7c-19.6 12.8-43.6 19.2-71.5 19.2c-19.5 0-37-3.2-52.7-9.3c-15.1-5.9-28.7-14.9-39.9-26.5a121.2 121.2 0 0 1-25.1-41.2c-6.1-16.9-9.1-34.7-8.9-52.6c0-18.5 3.1-35.7 9.1-51.7c11.5-31.1 35.4-56 65.9-68.9c16.3-6.8 33.8-10.2 51.5-10c21 0 39.2 4 55 12.2a111.6 111.6 0 0 1 38.6 32.8c10.1 13.7 17.2 29.3 21.7 46.9c4.3 17.3 5.8 35.5 4.6 54.7m-122-95.6c-10.8 0-19.9 1.9-26.9 5.6s-12.8 8.3-17.2 13.6a48.4 48.4 0 0 0-9.1 17.4c-1.6 5.3-2.7 10.7-3.1 16.2H723c-1.6-17.3-7.6-30.1-15.6-39.1c-8.4-8.9-21.9-13.7-38.6-13.7m-248.5-10.1c8.7-6.3 12.9-16.7 12.9-31c.3-6.8-1.1-13.5-4.1-19.6c-2.7-4.9-6.7-9-11.6-11.9a44.8 44.8 0 0 0-16.6-6c-6.4-1.2-12.9-1.8-19.3-1.7h-70.3v79.7h76.1c13.1.1 24.2-3.1 32.9-9.5m11.8 72c-9.8-7.5-22.9-11.2-39.2-11.2h-81.8v94h80.2c7.5 0 14.4-.7 21.1-2.1s12.7-3.8 17.8-7.2c5.1-3.3 9.2-7.8 12.3-13.6c3-5.8 4.5-13.2 4.5-22.1c0-17.7-5-30.2-14.9-37.8"
                  />
                </svg>
              ),
              link: "https://www.behance.net/elangsamudra",
            },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <social.icon className="w-6 h-6 md:w-7 md:h-7" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}