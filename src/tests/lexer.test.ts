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
        `;
    const lex: Lexer = new Lexer(input);

    const headingTests: Token[] = [
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.H1, "h1"),
        new Token(TokenType.H2, "h2"),
        new Token(TokenType.H3, "h3"),
        new Token(TokenType.H4, "h4"),
        new Token(TokenType.H5, "h5"),
        new Token(TokenType.H6, "h6"),

        new Token(TokenType.EOF, ""),
    ];

    headingTests.forEach((t) => {
        const tok = lex.nextToken();
        expect(tok.literal).toBe(t.literal);
        expect(tok.type).toBe(t.type);
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

        new Token(TokenType.BOLD, "bold"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.BOLD, "bold"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.ITTALIC, "ittalic"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.ITTALIC, "ittalic"),
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
        new Token(TokenType.PARAGRAPH, "para2"),
        new Token(TokenType.PARAGRAPH, "para3"),

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
            # h1
            ## h2
            ### h3
            #### h4
            ##### h5
            ###### h6

            **bold**
            __bold__
            *ittalic*
            _ittalic_

            para1
            para2
            para3
        `;
    const lex: Lexer = new Lexer(input);

    const headingTests: Token[] = [
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.H1, "h1"),
        new Token(TokenType.H2, "h2"),
        new Token(TokenType.H3, "h3"),
        new Token(TokenType.H4, "h4"),
        new Token(TokenType.H5, "h5"),
        new Token(TokenType.H6, "h6"),

        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.BOLD, "bold"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.BOLD, "bold"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.ITTALIC, "ittalic"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.ITTALIC, "ittalic"),
        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.NEW_LINE, "\n"),

        new Token(TokenType.PARAGRAPH, "para1"),
        new Token(TokenType.PARAGRAPH, "para2"),
        new Token(TokenType.PARAGRAPH, "para3"),

        new Token(TokenType.EOF, ""),
    ];

    headingTests.forEach((t) => {
        const tok = lex.nextToken();
        expect(tok.type).toBe(t.type);
        expect(tok.literal).toBe(t.literal);
    });
});
