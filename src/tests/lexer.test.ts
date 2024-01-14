import { test, expect } from "vitest";
import { Lexer } from "../lexer/lexer";
import { Token, TokenType } from "../lexer/token";

test("Testing heading lexing", () => {
    const input: string = `
            # h1
            ## h2
            ### h3
            #### h4
            ##### h5
            ###### h6

            #h1
        `;
    const lex: Lexer = new Lexer(input);

    const headingTests: Token[] = [
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.H1, "#"),
        new Token(TokenType.PARAGRAPH, "h1"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.H2, "##"),
        new Token(TokenType.PARAGRAPH, "h2"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.H3, "###"),
        new Token(TokenType.PARAGRAPH, "h3"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.H4, "####"),
        new Token(TokenType.PARAGRAPH, "h4"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.H5, "#####"),
        new Token(TokenType.PARAGRAPH, "h5"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.H6, "######"),
        new Token(TokenType.PARAGRAPH, "h6"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.ILLEGAL, "#"),
        new Token(TokenType.PARAGRAPH, "h1"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.EOF, ""),
    ];

    headingTests.forEach((t) => {
        const tok = lex.nextToken();
        expect(tok.type).toBe(t.type);
        expect(tok.literal).toBe(t.literal);
    });
});

test("Testing bold and ittalic lexing", () => {
    const input: string = `
            **bold**
            __bold__
            *ittalic*
            _ittalic_
        `;
    const lex: Lexer = new Lexer(input);

    const headingTests: Token[] = [
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.BOLD, "**"),
        new Token(TokenType.PARAGRAPH, "bold"),
        new Token(TokenType.BOLD, "**"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.BOLD, "__"),
        new Token(TokenType.PARAGRAPH, "bold"),
        new Token(TokenType.BOLD, "__"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.ITTALIC, "*"),
        new Token(TokenType.PARAGRAPH, "ittalic"),
        new Token(TokenType.ITTALIC, "*"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.ITTALIC, "_"),
        new Token(TokenType.PARAGRAPH, "ittalic"),
        new Token(TokenType.ITTALIC, "_"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.EOF, ""),
    ];

    headingTests.forEach((t) => {
        const tok = lex.nextToken();
        expect(tok.type).toBe(t.type);
        expect(tok.literal).toBe(t.literal);
    });
});

test("Testing paragraph lexing", () => {
    const input: string = `
            para1
            para2
            para3
        `;
    const lex: Lexer = new Lexer(input);

    const headingTests: Token[] = [
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.PARAGRAPH, "para1"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.PARAGRAPH, "para2"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.PARAGRAPH, "para3"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.EOF, ""),
    ];

    headingTests.forEach((t) => {
        const tok = lex.nextToken();
        expect(tok.type).toBe(t.type);
        expect(tok.literal).toBe(t.literal);
    });
});

test("Testing mixed lexing", () => {
    const input: string = `
            # h1**bold**

            para1_ittalic_
        `;
    const lex: Lexer = new Lexer(input);

    const headingTests: Token[] = [
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.H1, "#"),
        new Token(TokenType.PARAGRAPH, "h1"),
        new Token(TokenType.BOLD, "**"),
        new Token(TokenType.PARAGRAPH, "bold"),
        new Token(TokenType.BOLD, "**"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.PARAGRAPH, "para1"),
        new Token(TokenType.ITTALIC, "_"),
        new Token(TokenType.PARAGRAPH, "ittalic"),
        new Token(TokenType.ITTALIC, "_"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.EOF, ""),
    ];

    headingTests.forEach((t) => {
        const tok = lex.nextToken();
        expect(tok.type).toBe(t.type);
        expect(tok.literal).toBe(t.literal);
    });
});
